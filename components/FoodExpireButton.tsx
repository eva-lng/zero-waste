import updateFoodStatus from "@/app/actions/updateFoodStatus";
import { MdEventBusy } from "react-icons/md";

const FoodExpireButton = ({ foodId }: { foodId: string }) => {
  const updateFoodStatusById = updateFoodStatus.bind(null, foodId, "expired");

  return (
    <form action={updateFoodStatusById}>
      <button type="submit" className="cursor-pointer">
        <MdEventBusy />
      </button>
    </form>
  );
};

export default FoodExpireButton;
