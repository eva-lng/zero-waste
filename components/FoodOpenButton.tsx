"use client";
import { useState } from "react";
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

const FoodOpenButton = ({ item }: { item: FoodItemClient }) => {
  const [open, setOpen] = useState(false);

  const initialDate = new Date(item.expirationDate).getTime();

  const [expDateState, setExpDateState] = useState(initialDate);
  const [hasAdjusted, setHasAdjusted] = useState(false);

  const openDate = new Date();

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (isOpen) {
      setExpDateState(initialDate);
      setHasAdjusted(false);
    }
  }

  const openFoodById = openFood.bind(null, item._id);

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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center cursor-pointer">
          <LuPackageOpen size={25} />
          <span className="text-sm">Open</span>
        </div>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <form action={openFoodById}>
          <DialogHeader>
            <DialogTitle>Open {item.name}</DialogTitle>
            {/* <DialogDescription>
              Open {item.name} and adjust expiration date (optional).
            </DialogDescription> */}
          </DialogHeader>

          <DialogFoodInfo item={item} />
          <DialogFoodQty item={item} />

          <div className="my-3">
            <div className="flex justify-between border-b p-0.5">
              <span>Open date</span>
              <span>
                {openDate.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <DateAdjustField adjustDate={adjustDate} />

            <div className="flex justify-between p-0.5">
              <label
                htmlFor="expirationDate"
                className="text-gray-700 font-bold"
              >
                Expiration Date
              </label>
              <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={new Date(expDateState).toISOString().split("T")[0]}
                onChange={(e) => {
                  setExpDateState(new Date(e.target.value).getTime());
                  setHasAdjusted(true);
                }}
                required
              />
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

export default FoodOpenButton;
