import { FoodItemClient } from "@/lib/utils/types";
import { capitalize, getExpirationLabelShort } from "@/lib/utils/utilities";

const DialogFoodInfo = ({ item }: { item: FoodItemClient }) => {
  return (
    <div>
      <p>ITEM INFO</p>
      <div className="flex justify-between">
        <span>Storage</span>
        <span>{capitalize(item.storage)}</span>
      </div>
      <div className="flex justify-between">
        <span>Expires</span>
        <span>{getExpirationLabelShort(new Date(item.expirationDate))}</span>
      </div>
      <div className="flex justify-between">
        <span>Added</span>
        <span>
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
