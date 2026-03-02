import deleteFood from "@/app/actions/deleteFood";
import { FaCircleMinus } from "react-icons/fa6";

const FoodDeleteButton = ({ foodId }: { foodId: string }) => {
  const deleteFoodById = deleteFood.bind(null, foodId);

  return (
    <form action={deleteFoodById}>
      <button type="submit" className="cursor-pointer">
        <FaCircleMinus className="text-red-600" />
      </button>
    </form>
  );
};

export default FoodDeleteButton;
