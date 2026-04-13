"use client";
import { useState } from "react";
import { FoodItemClient } from "@/lib/utils/types";
import expireFood from "@/app/actions/expireFood";
import SubmitButton from "./SubmitButton";
import { capitalize } from "@/lib/utils/utilities";
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
  const [quantity, setQuantity] = useState(1);

  const remaining = Math.max(0, item.quantity - quantity);

  const expireFoodById = expireFood.bind(null, item._id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center cursor-pointer">
          <TbClockExclamation size={25} />
          <span className="text-sm">Expired</span>
        </div>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <form action={expireFoodById}>
          <DialogHeader>
            <DialogTitle>Discard {item.name}</DialogTitle>
            {/* <DialogDescription>Mark item as expired</DialogDescription> */}
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

export default FoodExpireButton;
