import { FoodItemClient } from "@/lib/utils/types";
import consumeFood from "@/app/actions/consumeFood";
import SubmitButton from "./SubmitButton";
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
            <DialogDescription>
              Select quantity to mark as consumed
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

export default FoodConsumeButton;
