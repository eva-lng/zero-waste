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
            {/* <DialogDescription>
              Select quantity to mark as consumed
            </DialogDescription> */}
          </DialogHeader>

          <DialogFoodInfo item={item} />
          <DialogFoodQty item={item} />

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
