import { FoodItemClient } from "@/lib/utils/types";
import openFood from "@/app/actions/openFood";
import SubmitButton from "./SubmitButton";
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
  const openFoodById = openFood.bind(null, item._id);

  return (
    <Dialog>
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
            <DialogDescription>
              Open {item.name} and adjust expiration date (optional).
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
          <div className="py-2">
            <label
              htmlFor="expirationDate"
              className="text-gray-700 font-bold mb-1.5 mr-1"
            >
              Expiration Date:
            </label>
            <input
              type="date"
              id="expirationDate"
              name="expirationDate"
              className="border rounded py-1 px-2"
              defaultValue={item.expirationDate.split("T")[0]}
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

export default FoodOpenButton;
