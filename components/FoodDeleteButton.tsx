import deleteFood from "@/app/actions/deleteFood";
import SubmitButton from "./SubmitButton";
import { FiTrash2 } from "react-icons/fi";

const FoodDeleteButton = ({ foodId }: { foodId: string }) => {
  const deleteFoodById = deleteFood.bind(null, foodId);

  return (
    <form action={deleteFoodById}>
      <SubmitButton className="cursor-pointer">
        <FiTrash2 className="text-red-600" />
      </SubmitButton>
    </form>
  );
};

export default FoodDeleteButton;
