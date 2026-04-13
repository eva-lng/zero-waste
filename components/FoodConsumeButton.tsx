"use client";
import { useState } from "react";
import { FoodItemClient } from "@/lib/utils/types";
import consumeFood from "@/app/actions/consumeFood";
import SubmitButton from "./SubmitButton";
import { capitalize } from "@/lib/utils/utilities";
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

const FoodConsumeButton = ({ item }: { item: FoodItemClient }) => {
  const [quantity, setQuantity] = useState(1);

  const remaining = Math.max(0, item.quantity - quantity);

  const consumeFoodById = consumeFood.bind(null, item._id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center cursor-pointer">
          <GiKnifeFork size={25} />
          <span className="text-sm">Consumed</span>
        </div>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <form action={consumeFoodById}>
          <DialogHeader>
            <DialogTitle>Consume {item.name}</DialogTitle>
            {/* <DialogDescription>
              Select quantity to mark as consumed
            </DialogDescription> */}
          </DialogHeader>
          <div className="my-3">
            <div className="flex justify-between border-b p-0.5">
              <span>Storage</span>
              <span>{capitalize(item.storage)}</span>
            </div>
            <div className="flex justify-between border-b p-0.5">
              <span>Expiration date</span>
              <span>
                {new Date(item.expirationDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between p-0.5">
              <span>Storage date</span>
              <span>
                {new Date(item.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="my-3">
            <div className="flex justify-between border-b p-0.5">
              <span>Remaining</span>
              <span>{remaining}</span>
            </div>
            <div className="flex justify-between p-0.5">
              <label htmlFor="quantity" className="text-gray-700 font-bold">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val <= item.quantity) setQuantity(val);
                }}
                min={0.25}
                max={item.quantity}
                step={0.25}
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

export default FoodConsumeButton;
