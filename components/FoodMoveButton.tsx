import SubmitButton from "./SubmitButton";
import { LiaExchangeAltSolid } from "react-icons/lia";
import updateFoodStorage from "@/app/actions/updateFoodStorage";
import { StorageType } from "@/lib/utils/types";
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

const FoodMoveButton = ({
  foodId,
  storage,
  name,
}: {
  foodId: string;
  storage: StorageType;
  name: string;
}) => {
  const updateFoodStorageById = updateFoodStorage.bind(null, foodId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center cursor-pointer">
          <LiaExchangeAltSolid size={25} />
          <span className="text-sm">Move</span>
        </div>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <form action={updateFoodStorageById}>
          <DialogHeader>
            <DialogTitle>Move {name}</DialogTitle>
            <DialogDescription>
              Select new storage for {name}.
            </DialogDescription>
          </DialogHeader>
          <div>
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
              defaultValue={storage}
              required
            >
              <option value="pantry">Pantry</option>
              <option value="fridge">Fridge</option>
              <option value="freezer">Freezer</option>
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
