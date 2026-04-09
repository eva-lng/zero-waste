import updateFoodStatus from "@/app/actions/updateFoodStatus";
import SubmitButton from "./SubmitButton";
import { TbClockExclamation } from "react-icons/tb";

const FoodExpireButton = ({ foodId }: { foodId: string }) => {
  const updateFoodStatusById = updateFoodStatus.bind(null, foodId, "discarded");

  return (
    <form action={updateFoodStatusById}>
      <SubmitButton className="cursor-pointer">
        <div className="flex flex-col items-center">
          <TbClockExclamation />
          <span>Expired</span>
        </div>
      </SubmitButton>
    </form>
  );
};

export default FoodExpireButton;
