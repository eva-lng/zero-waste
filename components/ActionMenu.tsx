import { FoodItemClient } from "@/lib/utils/types";
import FoodDeleteButton from "./FoodDeleteButton";
import FoodConsumeButton from "./FoodConsumeButton";
import FoodExpireButton from "./FoodExpireButton";
import FoodOpenButton from "./FoodOpenButton";
import FoodMoveButton from "./FoodMoveButton";

const ActionMenu = ({ item }: { item: FoodItemClient }) => {
  return (
    <div className="flex justify-between items-center border-t">
      <FoodConsumeButton item={item} />
      <FoodExpireButton item={item} />
      <FoodMoveButton item={item} />
      {!item.isOpen && <FoodOpenButton item={item} />}
      <FoodDeleteButton foodId={item._id} name={item.name} />
    </div>
  );
};

export default ActionMenu;
