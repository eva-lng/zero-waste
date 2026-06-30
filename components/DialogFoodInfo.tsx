import { FoodItemClient } from "@/lib/utils/types";
import {
  capitalize,
  getExpirationLabelShort,
  getExpiryColor,
} from "@/lib/utils/utilities";

const DialogFoodInfo = ({ item }: { item: FoodItemClient }) => {
  return (
    <div className="flex flex-col gap-1.5 mb-4 card-body">
      <p className="section-title text-xs">Item info</p>
      <div className="flex justify-between items-center">
        <span>Storage</span>
        <span className="font-medium">{capitalize(item.storage)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Expires</span>
        <span
          className={`font-medium ${getExpiryColor(new Date(item.expirationDate))}`}
        >
          {getExpirationLabelShort(new Date(item.expirationDate))}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span>Added</span>
        <span className="font-medium">
          {new Date(item.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          })}
        </span>
      </div>
    </div>
  );
};

export default DialogFoodInfo;
