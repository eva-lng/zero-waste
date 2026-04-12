import { FoodItemClient } from "@/lib/utils/types";
import expireFood from "@/app/actions/expireFood";
import SubmitButton from "./SubmitButton";
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
            <DialogDescription>
              Select quantity to mark as expired
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <label
              htmlFor="quantity"
              className="text-gray-700 font-bold mb-1.5 mr-1"
            >
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="border rounded py-1 px-2"
              defaultValue={1}
              min={0.25}
              max={item.quantity}
              step={0.25}
              required
            />
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
