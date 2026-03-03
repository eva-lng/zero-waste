import updateFoodStatus from "@/app/actions/updateFoodStatus";
import { FaCircleCheck } from "react-icons/fa6";

const FoodConsumeButton = ({ foodId }: { foodId: string }) => {
  const updateFoodStatusById = updateFoodStatus.bind(null, foodId, "consumed");

  return (
    <form action={updateFoodStatusById}>
      <button type="submit" className="cursor-pointer">
        <FaCircleCheck className="text-green-600" />
      </button>
    </form>
  );
};

export default FoodConsumeButton;
