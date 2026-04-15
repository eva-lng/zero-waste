import moveFood from "@/app/actions/moveFood";
import { FoodItemClient } from "@/lib/utils/types";
import SubmitButton from "./SubmitButton";
import DialogFoodInfo from "./DialogFoodInfo";
import DialogFoodQty from "./DialogFoodQty";
import { capitalize } from "@/lib/utils/utilities";
import { LiaExchangeAltSolid } from "react-icons/lia";
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
            {/* <DialogDescription>
              Select new storage for {item.name}.
            </DialogDescription> */}
          </DialogHeader>

          <DialogFoodInfo item={item} />
          <DialogFoodQty item={item} />

          <div className="my-3">
            <div className="flex justify-between border-b p-0.5">
              <span>From</span>
              <span>{capitalize(item.storage)}</span>
            </div>
            <div className="flex justify-between p-0.5">
              <label htmlFor="storage" className="text-gray-700 font-bold">
                To
              </label>
              <select name="storage" id="storage" required>
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
