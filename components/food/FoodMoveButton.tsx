"use client";
import { useState, useActionState, useEffect } from "react";
import moveFood from "@/app/actions/moveFood";
import { FoodItemClient } from "@/lib/utils/types";
import SubmitButton from "../layout/SubmitButton";
import DialogFoodInfo from "./DialogFoodInfo";
import DialogFoodQty from "./DialogFoodQty";
import { capitalize } from "@/lib/utils/utilities";
import { TbArrowsExchange } from "react-icons/tb";
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

const FoodMoveButton = ({
  item,
  compact,
}: {
  item: FoodItemClient;
  compact: boolean;
}) => {
  const initialState = {
    data: { quantity: "", storage: "" },
    errors: {},
    successTimeStamp: 0,
  };
  const [formState, formAction, pending] = useActionState(
    moveFood.bind(null, item._id),
    initialState,
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errors, setErrors] = useState<{
    quantity?: string[];
    storage?: string[];
  }>({});

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
    if (!isOpen) setErrors({});
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="flex flex-col items-center gap-1 flex-1 p-2 cursor-pointer hover:bg-muted">
          <TbArrowsExchange size={16} />
          <span className="text-xs">Move</span>
        </button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <form action={formAction} noValidate>
          <DialogHeader className="mb-4">
            <DialogTitle className="text-base">Move {item.name}</DialogTitle>
            <DialogDescription className="sr-only">
              Select new storage for {item.name}.
            </DialogDescription>
          </DialogHeader>

          <DialogFoodInfo item={item} />
          <DialogFoodQty
            item={item}
            textRemaining={`Remaining in ${item.storage}`}
            sectionLabel="Quantity to move"
            errors={errors}
          />

          <div className="flex flex-col gap-1.5 mb-4 card-body">
            <p className="section-title text-xs">Destination</p>
            <div className="flex justify-between items-center">
              <span>From</span>
              <span className="font-medium">{capitalize(item.storage)}</span>
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="storage">To</label>
              <select
                name="storage"
                id="storage"
                className="select"
                required
                aria-invalid={!!errors?.storage}
                aria-describedby={errors?.storage ? "storage-error" : undefined}
              >
                <option value="pantry" disabled={item.storage === "pantry"}>
                  Pantry
                </option>
                <option value="fridge" disabled={item.storage === "fridge"}>
                  Fridge
                </option>
                <option value="freezer" disabled={item.storage === "freezer"}>
                  Freezer
                </option>
              </select>
            </div>
            <div className="text-end">
              {errors?.storage && (
                <small
                  id="storage-error"
                  aria-live="polite"
                  className="text-destructive text-xs"
                >
                  {errors.storage[0]}
                </small>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={pending}>
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton
              pendingText="Saving..."
              loading={pending}
              className="btn-primary"
            >
              Save
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FoodMoveButton;
