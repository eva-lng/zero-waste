"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FoodItemClient, StorageType } from "@/lib/utils/types";
import FoodItemCard from "./FoodItemCard";
import { capitalize } from "@/lib/utils/utilities";
import { TbSalad, TbSearch, TbFilter } from "react-icons/tb";

const FoodItemsList = ({ items }: { items: FoodItemClient[] }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const params = useSearchParams();

  const hasSearch = params.has("search");
  const hasFilters = ["category", "storage", "expiration", "open"].some((key) =>
    params.has(key),
  );

  const itemsByStorage: Partial<Record<StorageType, FoodItemClient[]>> = {};
  items.forEach((item) => {
    const storage = item.storage as StorageType;
    itemsByStorage[storage] = itemsByStorage[storage] || [];
    itemsByStorage[storage].push(item);
  });

  return (
    <div className="flex flex-col gap-6">
      {items.length === 0 && (
        <div
          role="status"
          className="flex-1 flex flex-col items-center justify-center py-16 text-center gap-3"
        >
          {!hasSearch && !hasFilters ? (
            <>
              <TbSalad
                size={40}
                strokeWidth={1.5}
                className="text-muted-foreground"
              />
              <p className="text-sm font-medium">Your inventory is empty</p>
              <p className="text-xs text-muted-foreground">
                Add your first food item to get started
              </p>
            </>
          ) : hasSearch && !hasFilters ? (
            <>
              <TbSearch
                size={40}
                strokeWidth={1.5}
                className="text-muted-foreground"
              />
              <p className="text-sm font-medium">
                No results for "{params.get("search")}"
              </p>
              <p className="text-xs text-muted-foreground">
                Try a different search term
              </p>
            </>
          ) : (
            <>
              <TbFilter
                size={40}
                strokeWidth={1.5}
                className="text-muted-foreground"
              />
              <p className="text-sm font-medium text-foreground">
                No items match your filters
              </p>
            </>
          )}
        </div>
      )}
      {Object.keys(itemsByStorage).map((storage) => {
        const storageKey = storage as StorageType;
        return (
          <section key={storageKey}>
            <p className="section-title mb-2">{capitalize(storageKey)}</p>
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
