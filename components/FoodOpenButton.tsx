"use client";
import { useState, useActionState, useEffect } from "react";
import { FoodItemClient } from "@/lib/utils/types";
import openFood from "@/app/actions/openFood";
import SubmitButton from "./SubmitButton";
import DialogFoodInfo from "./DialogFoodInfo";
import DialogFoodQty from "./DialogFoodQty";
import DateAdjustField from "./DateAdjustField";
import { LuPackageOpen } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const FoodOpenButton = ({
  item,
  compact,
}: {
  item: FoodItemClient;
  compact: boolean;
}) => {
  const initialState = {
    data: { quantity: "", expirationDate: "" },
    errors: {},
    successTimeStamp: 0,
  };
  const [formState, formAction, pending] = useActionState(
    openFood.bind(null, item._id),
    initialState,
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errors, setErrors] = useState<{
    quantity?: string[];
    expirationDate?: string[];
  }>({});

  const initialDate = new Date(item.expirationDate).getTime();

  const [expDateState, setExpDateState] = useState(initialDate);
  const [hasAdjusted, setHasAdjusted] = useState(false);

  const openDate = new Date();

  useEffect(() => {
    if (formState.successTimeStamp) {
      setDialogOpen(false);
    }
  }, [formState.successTimeStamp]);

  useEffect(() => {
    setErrors(formState.errors);
  }, [formState.errors]);

  function handleOpenChange(isOpen: boolean) {
    setDialogOpen(isOpen);
    if (isOpen) {
      setExpDateState(initialDate);
      setHasAdjusted(false);
    }
    if (!isOpen) setErrors({});
  }

  function adjustDate(numOfDays: number) {
    const date = hasAdjusted ? new Date(expDateState) : openDate;

    if (numOfDays < 30) {
      date.setDate(date.getDate() + numOfDays);
    } else if (numOfDays === 30) {
      date.setMonth(date.getMonth() + 1);
    } else if (numOfDays === 90) {
      date.setMonth(date.getMonth() + 3);
    } else if (numOfDays === 365) {
      date.setFullYear(date.getFullYear() + 1);
    }

    setExpDateState(date.getTime());

    if (!hasAdjusted) setHasAdjusted(true);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="flex flex-col items-center gap-1 flex-1 py-2 cursor-pointer">
          <LuPackageOpen size={18} />
          <span className="text-xs">Open</span>
        </button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <form action={formAction} noValidate>
          <DialogHeader>
            <DialogTitle>Open {item.name}</DialogTitle>
            <DialogDescription className="sr-only">
              Open {item.name} and adjust expiration date (optional).
            </DialogDescription>
          </DialogHeader>

          <DialogFoodInfo item={item} />
          <DialogFoodQty
            item={item}
            sectionLabel="Quantity to open"
            errors={errors}
          />

          <div className="my-3">
            <p>OPEN DATE & NEW EXPIRATION</p>
            <div className="flex justify-between">
              <span>Opened</span>
              <span>
                {openDate.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>

            <DateAdjustField adjustDate={adjustDate} />

            <div className="flex justify-between">
              <label htmlFor="expirationDate">Expiration Date</label>
              <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={new Date(expDateState).toISOString().split("T")[0]}
                onChange={(e) => {
                  setExpDateState(new Date(e.target.value).getTime());
                  setHasAdjusted(true);
                }}
                className="border rounded p-1"
                required
                aria-invalid={!!errors?.expirationDate}
                aria-describedby={
                  errors?.expirationDate ? "expirationDate-error" : undefined
                }
              />
            </div>
            <div className="text-end">
              {errors?.expirationDate && (
                <small
                  id="expirationDate-error"
                  aria-live="polite"
                  className="text-red-500"
                >
                  {errors.expirationDate[0]}
                </small>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton pendingText="Saving..." loading={pending}>
              Save
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FoodOpenButton;
