import SubmitButton from "./SubmitButton";
import { LiaExchangeAltSolid } from "react-icons/lia";
import moveFood from "@/app/actions/moveFood";
import { FoodItemClient } from "@/lib/utils/types";
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
  const moveFoodById = moveFood.bind(null, item._id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center cursor-pointer">
          <LiaExchangeAltSolid size={25} />
          <span className="text-sm">Move</span>
        </div>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <form action={moveFoodById}>
          <DialogHeader>
            <DialogTitle>Move {item.name}</DialogTitle>
            <DialogDescription>
              Select new storage for {item.name}.
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
              htmlFor="storage"
              className="text-gray-700 font-bold mb-1.5 mr-1"
            >
              Storage:
            </label>
            <select
              name="storage"
              id="storage"
              className="border rounded py-1 px-2"
              required
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
