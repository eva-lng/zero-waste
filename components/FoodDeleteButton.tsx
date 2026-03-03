import deleteFood from "@/app/actions/deleteFood";
import { FiTrash2 } from "react-icons/fi";

const FoodDeleteButton = ({ foodId }: { foodId: string }) => {
  const deleteFoodById = deleteFood.bind(null, foodId);

  return (
    <form action={deleteFoodById}>
      <button type="submit" className="cursor-pointer">
        <FiTrash2 className="text-red-600" />
      </button>
    </form>
  );
};

export default FoodDeleteButton;
