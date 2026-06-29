"use client";
import { useState } from "react";
import { FoodItemClient, StorageType } from "@/lib/utils/types";
import FoodItemCard from "./FoodItemCard";
import { capitalize } from "@/lib/utils/utilities";

const FoodItemsList = ({ items }: { items: FoodItemClient[] }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const itemsByStorage: Partial<Record<StorageType, FoodItemClient[]>> = {};
  items.forEach((item) => {
    const storage = item.storage as StorageType;
    itemsByStorage[storage] = itemsByStorage[storage] || [];
    itemsByStorage[storage].push(item);
  });

  return (
    <div className="flex flex-col gap-6">
      {items.length === 0 && (
        <p role="status" className="text-center">
          No items found
        </p>
      )}
      {Object.keys(itemsByStorage).map((storage) => {
        const storageKey = storage as StorageType;
        return (
          <section key={storageKey}>
            <p className="section-title mb-2">
              {capitalize(storageKey.toUpperCase())}
            </p>
            <ul className="grid md:grid-cols-2 gap-2 md:gap-3">
              {itemsByStorage[storageKey]?.map((item) => (
                <li key={item._id}>
                  <FoodItemCard
                    item={item}
                    isMenuOpen={item._id === openId}
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
