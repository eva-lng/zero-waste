import { FoodItemType } from "@/types/food";
import deleteFood from "@/app/actions/deleteFood";
import { getExpirationLabel } from "@/lib/utils/food";
import { FaCircleMinus } from "react-icons/fa6";
import Link from "next/link";

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
        </div>
      </Link>
      <div className="flex flex-col justify-between items-end">
        <form action={deleteFood}>
          <input type="hidden" name="foodId" value={item._id.toString()} />
          <button type="submit" className="cursor-pointer">
            <FaCircleMinus className="text-red-600" />
          </button>
        </form>
        <span>
          {item.category} ({item.storage})
        </span>
      </div>
    </div>
  );
};

export default FoodItemCard;
