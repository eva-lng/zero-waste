import updateFoodStatus from "@/app/actions/updateFoodStatus";
import SubmitButton from "./SubmitButton";
import { MdEventBusy } from "react-icons/md";

const FoodExpireButton = ({ foodId }: { foodId: string }) => {
  const updateFoodStatusById = updateFoodStatus.bind(null, foodId, "expired");

  return (
    <form action={updateFoodStatusById}>
      <SubmitButton className="cursor-pointer">
        <MdEventBusy />
      </SubmitButton>
    </form>
  );
};

export default FoodExpireButton;
