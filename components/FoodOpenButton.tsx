import openFood from "@/app/actions/openFood";
import SubmitButton from "./SubmitButton";
import { LuPackageOpen } from "react-icons/lu";

const FoodOpenButton = ({ foodId }: { foodId: string }) => {
  const openFoodById = openFood.bind(null, foodId);

  return (
    <form action={openFoodById}>
      <SubmitButton className="cursor-pointer">
        <div className="flex flex-col items-center">
          <LuPackageOpen size={25} />
          <span className="text-sm">Open</span>
        </div>
      </SubmitButton>
    </form>
  );
};

export default FoodOpenButton;
