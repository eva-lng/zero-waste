import { FoodItemClient } from "@/lib/utils/types";
import openFood from "@/app/actions/openFood";
import SubmitButton from "./SubmitButton";
import DialogFoodInfo from "./DialogFoodInfo";
import DialogFoodQty from "./DialogFoodQty";
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
                {new Date().toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
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
                defaultValue={item.expirationDate.split("T")[0]}
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
