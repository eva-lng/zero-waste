"use client";
import { useState } from "react";
import { FoodItemClient } from "@/lib/utils/types";

const DialogFoodQty = ({ item }: { item: FoodItemClient }) => {
  const [quantity, setQuantity] = useState(1);
  const remaining = Math.max(0, item.quantity - quantity);

  return (
    <div className="my-3">
      <div className="flex justify-between border-b p-0.5">
        <span>Remaining</span>
        <span>
          {remaining} {item.unit}
          {(item.unit === "piece" || item.unit === "package") &&
            remaining > 1 &&
            "s"}
        </span>
      </div>
      <div className="flex justify-between p-0.5">
        <label htmlFor="quantity" className="text-gray-700 font-bold">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val <= item.quantity) setQuantity(val);
          }}
          min={item.unit === "piece" || item.unit === "package" ? 0.25 : 1}
          max={item.quantity}
          step={item.unit === "piece" || item.unit === "package" ? 0.25 : 1}
          required
        />
      </div>
    </div>
  );
};

export default DialogFoodQty;
