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

const FoodExpireButton = ({ item }: { item: FoodItemClient }) => {
  const initialState = {
    data: { quantity: "" },
    errors: {},
    message: "",
  };
  const [formState, formAction, pending] = useActionState(
    expireFood.bind(null, item._id),
    initialState,
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formState.message === "success") {
      setDialogOpen(false);
    }
  }, [formState.message]);

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
          <TbClockExclamation size={25} />
          <span className="text-sm">Expired</span>
        </div>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Discard {item.name}</DialogTitle>
            {/* <DialogDescription>Mark item as expired</DialogDescription> */}
          </DialogHeader>

          <DialogFoodInfo item={item} />
          <DialogFoodQty item={item} errors={errors} />

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

export default FoodExpireButton;
