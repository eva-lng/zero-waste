import { FoodItemClient } from "@/lib/utils/types";
import FoodDeleteButton from "./FoodDeleteButton";
import FoodConsumeButton from "./FoodConsumeButton";
import FoodExpireButton from "./FoodExpireButton";
import FoodOpenButton from "./FoodOpenButton";
import FoodMoveButton from "./FoodMoveButton";

const ActionMenu = ({
  item,
  compact = false,
}: {
  item: FoodItemClient;
  compact?: boolean;
}) => {
  return (
    <div className="flex items-center border-t divide-x divide-border">
      <FoodConsumeButton item={item} compact={compact} />
      <FoodExpireButton item={item} compact={compact} />
      <FoodMoveButton item={item} compact={compact} />
      {!item.isOpen && <FoodOpenButton item={item} compact={compact} />}
      <FoodDeleteButton foodId={item._id} name={item.name} compact={compact} />
    </div>
  );
};

export default ActionMenu;
