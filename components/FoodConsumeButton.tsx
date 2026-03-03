import updateFoodStatus from "@/app/actions/updateFoodStatus";
import SubmitButton from "./SubmitButton";
import { FiCheckCircle } from "react-icons/fi";

const FoodConsumeButton = ({ foodId }: { foodId: string }) => {
  const updateFoodStatusById = updateFoodStatus.bind(null, foodId, "consumed");

  return (
    <form action={updateFoodStatusById}>
      <SubmitButton className="cursor-pointer">
        <FiCheckCircle className="text-green-600" />
      </SubmitButton>
    </form>
  );
};

export default FoodConsumeButton;
