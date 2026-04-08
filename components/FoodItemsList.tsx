"use client";
import { useState } from "react";
import { FoodItemClient, StorageType } from "@/types/food";
import { capitalize } from "@/lib/utils/food";
import FoodItemCard from "./FoodItemCard";

const FoodItemsList = ({ items }: { items: FoodItemClient[] }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const itemsByStorage: Partial<Record<StorageType, FoodItemClient[]>> = {};
  items.forEach((item) => {
    const storage = item.storage as StorageType;
    itemsByStorage[storage] = itemsByStorage[storage] || [];
    itemsByStorage[storage].push(item);
  });

  return (
    <div>
      {items.length === 0 && <p className="text-center">No items found</p>}
      {Object.keys(itemsByStorage).map((storage) => {
        const storageKey = storage as StorageType;
        return (
          <section key={storageKey}>
            <h3 className="text-xl">{capitalize(storageKey)}</h3>
            <ul>
              {itemsByStorage[storageKey]?.map((item) => (
                <li key={item._id}>
                  <FoodItemCard
                    item={item}
                    isOpen={item._id === openId}
                    onToggle={() =>
                      setOpenId((prev) => (prev === item._id ? null : item._id))
                    }
                  />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
};

export default FoodItemsList;
