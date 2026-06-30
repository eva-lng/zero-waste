"use client";
import { useState, useActionState, useEffect } from "react";
import { FoodItemClient } from "@/lib/utils/types";
import consumeFood from "@/app/actions/consumeFood";
import SubmitButton from "./SubmitButton";
import DialogFoodInfo from "./DialogFoodInfo";
import DialogFoodQty from "./DialogFoodQty";
import { GiKnifeFork } from "react-icons/gi";
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

const FoodConsumeButton = ({
  item,
  compact,
}: {
  item: FoodItemClient;
  compact: boolean;
}) => {
  const initialState = {
    data: {
      quantity: "",
    },
    errors: {},
    successTimeStamp: 0,
  };
  const [formState, formAction, pending] = useActionState(
    consumeFood.bind(null, item._id),
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
          <GiKnifeFork size={16} />
          <span className="text-xs">Consume</span>
        </button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <form action={formAction} noValidate>
          <DialogHeader className="mb-4">
            <DialogTitle className="text-[15px]">
              Consume {item.name}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Adjust quantity to mark as consumed
            </DialogDescription>
          </DialogHeader>

          <DialogFoodInfo item={item} />
          <DialogFoodQty
            item={item}
            sectionLabel="Quantity to consume"
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

export default FoodConsumeButton;
