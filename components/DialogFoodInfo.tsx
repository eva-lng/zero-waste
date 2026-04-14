import { FoodItemClient } from "@/lib/utils/types";
import { capitalize } from "@/lib/utils/utilities";

const DialogFoodInfo = ({ item }: { item: FoodItemClient }) => {
  return (
    <div>
      <div className="flex justify-between border-b p-0.5">
        <span>Storage</span>
        <span>{capitalize(item.storage)}</span>
      </div>
      <div className="flex justify-between border-b p-0.5">
        <span>Expiration date</span>
        <span>
          {new Date(item.expirationDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
      <div className="flex justify-between p-0.5">
        <span>Storage date</span>
        <span>
          {new Date(item.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};

export default DialogFoodInfo;
