import { FoodItemType } from "@/types/food";

const FoodItemCard = ({ item }: { item: FoodItemType }) => {
  return (
    <div className="flex justify-between border border-gray-500 rounded p-2 mb-2">
      <div className="flex flex-col">
        <h3>{item.name}</h3>
        <span>
          {item.quantity} {item.unit}
          {item.quantity > 1 && "s"}
        </span>
        <span>{item.expirationDate.toLocaleDateString()}</span>
      </div>
      <div className="flex flex-col justify-between items-end">
        <span>{item.storage}</span>
        <span>{item.category}</span>
      </div>
    </div>
  );
};

export default FoodItemCard;
