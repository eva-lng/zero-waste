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

const FoodOpenButton = ({
  foodId,
  expirationDate,
  name,
}: {
  foodId: string;
  expirationDate: string;
  name: string;
}) => {
  const openFoodById = openFood.bind(null, foodId);

  return (
    <>
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
              <DialogTitle>Open {name}</DialogTitle>
              <DialogDescription>
                Adjust expiration date for {name} (optional).
              </DialogDescription>
            </DialogHeader>
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
                defaultValue={expirationDate.split("T")[0]}
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

      {/* <form action={openFoodById}>
        <SubmitButton className="cursor-pointer">
          <div className="flex flex-col items-center">
            <LuPackageOpen size={25} />
            <span className="text-sm">Open</span>
          </div>
        </SubmitButton>
      </form> */}
    </>
  );
};

export default FoodOpenButton;
