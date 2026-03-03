import { FoodItemType } from "@/types/food";
import { getExpirationLabel } from "@/lib/utils/food";
import Link from "next/link";
import FoodDeleteButton from "./FoodDeleteButton";
import FoodConsumeButton from "./FoodConsumeButton";
import FoodExpireButton from "./FoodExpireButton";

const FoodItemCard = ({ item }: { item: FoodItemType }) => {
  return (
    <div className="flex justify-between border border-gray-500 rounded p-2 mb-2">
      <Link href={`/items/${item._id}`}>
        <div className="flex flex-col">
          <h3>{item.name}</h3>
          <span>
            {item.quantity} {item.unit}
            {item.quantity > 1 && "s"}
          </span>
          <span>{getExpirationLabel(item.expirationDate)}</span>
          <span>{item.category}</span>
        </div>
      </Link>
      <div className="flex flex-col justify-between items-end">
        <FoodConsumeButton foodId={item._id.toString()} />
        <FoodExpireButton foodId={item._id.toString()} />
        <FoodDeleteButton foodId={item._id.toString()} />
      </div>
    </div>
  );
};

export default FoodItemCard;
