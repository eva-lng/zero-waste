import updateFoodStatus from "@/app/actions/updateFoodStatus";
import { FiCheckCircle } from "react-icons/fi";

const FoodConsumeButton = ({ foodId }: { foodId: string }) => {
  const updateFoodStatusById = updateFoodStatus.bind(null, foodId, "consumed");

  return (
    <form action={updateFoodStatusById}>
      <button type="submit" className="cursor-pointer">
        <FiCheckCircle className="text-green-600" />
      </button>
    </form>
  );
};

export default FoodConsumeButton;
