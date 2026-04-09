import openFood from "@/app/actions/openFood";
import SubmitButton from "./SubmitButton";
import { GiOpenedFoodCan } from "react-icons/gi";

const FoodOpenButton = ({ foodId }: { foodId: string }) => {
  const openFoodById = openFood.bind(null, foodId);

  return (
    <form action={openFoodById}>
      <SubmitButton className="cursor-pointer">
        <div className="flex flex-col items-center">
          <GiOpenedFoodCan />
          <span>Open</span>
        </div>
      </SubmitButton>
    </form>
  );
};

export default FoodOpenButton;
