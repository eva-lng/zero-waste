"use client";
import { useState, useActionState, useEffect } from "react";
import moveFood from "@/app/actions/moveFood";
import { FoodItemClient } from "@/lib/utils/types";
import SubmitButton from "./SubmitButton";
import DialogFoodInfo from "./DialogFoodInfo";
import DialogFoodQty from "./DialogFoodQty";
import { capitalize } from "@/lib/utils/utilities";
import { LiaExchangeAltSolid } from "react-icons/lia";
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

const FoodMoveButton = ({ item }: { item: FoodItemClient }) => {
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
  const [errors, setErrors] = useState({});

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
        <div className="flex flex-col items-center cursor-pointer">
          <LiaExchangeAltSolid size={25} />
          <span className="text-sm">Move</span>
        </div>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <form action={formAction} noValidate>
          <DialogHeader>
            <DialogTitle>Move {item.name}</DialogTitle>
            {/* <DialogDescription>
              Select new storage for {item.name}.
            </DialogDescription> */}
          </DialogHeader>

          <DialogFoodInfo item={item} />
          <DialogFoodQty item={item} errors={errors} />

          <div className="my-3">
            <div className="flex justify-between border-b p-0.5">
              <span>From</span>
              <span>{capitalize(item.storage)}</span>
            </div>
            <div className="flex justify-between p-0.5">
              <label htmlFor="storage" className="text-gray-700 font-bold">
                To
              </label>
              <select
                name="storage"
                id="storage"
                required
                aria-invalid={!!formState.errors?.storage}
                aria-describedby={
                  formState.errors?.storage ? "storage-error" : undefined
                }
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
              {formState.errors?.storage && (
                <small
                  id="quantity-error"
                  aria-live="polite"
                  className="text-red-500"
                >
                  {formState.errors.storage[0]}
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
            <SubmitButton pendingText="Saving..." className="cursor-pointer">
              Save
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FoodMoveButton;
