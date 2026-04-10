import updateFoodStatus from "@/app/actions/updateFoodStatus";
import SubmitButton from "./SubmitButton";
import { GiKnifeFork } from "react-icons/gi";

const FoodConsumeButton = ({ foodId }: { foodId: string }) => {
  const updateFoodStatusById = updateFoodStatus.bind(null, foodId, "consumed");

  return (
    <form action={updateFoodStatusById}>
      <SubmitButton className="cursor-pointer">
        <div className="flex flex-col items-center">
          <GiKnifeFork size={25} />
          <span className="text-sm">Consumed</span>
        </div>
      </SubmitButton>
    </form>
  );
};

export default FoodConsumeButton;
