"use client";
import { useState, useActionState, useEffect } from "react";
import { FoodItemClient } from "@/lib/utils/types";
import expireFood from "@/app/actions/expireFood";
import SubmitButton from "./SubmitButton";
import DialogFoodInfo from "./DialogFoodInfo";
import DialogFoodQty from "./DialogFoodQty";
import { TbClockExclamation } from "react-icons/tb";
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

const FoodExpireButton = ({
  item,
  compact,
}: {
  item: FoodItemClient;
  compact: boolean;
}) => {
  const initialState = {
    data: { quantity: "" },
    errors: {},
    successTimeStamp: 0,
  };
  const [formState, formAction, pending] = useActionState(
    expireFood.bind(null, item._id),
    initialState,
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errors, setErrors] = useState<{ quantity?: string[] }>({});

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
        <button className="flex flex-col items-center gap-1 flex-1 p-2 cursor-pointer hover:bg-muted hover:font-semibold">
          <TbClockExclamation size={16} />
          <span className="text-xs">Expire</span>
        </button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <form action={formAction} noValidate>
          <DialogHeader className="mb-4">
            <DialogTitle className="text-[15px]">
              Discard {item.name}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Adjust quantity to mark as expired
            </DialogDescription>
          </DialogHeader>

          <DialogFoodInfo item={item} />
          <DialogFoodQty
            item={item}
            sectionLabel="Quantity to discard"
            errors={errors}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
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

export default FoodExpireButton;
