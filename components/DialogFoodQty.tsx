"use client";
import { useState } from "react";
import { FoodItemClient } from "@/lib/utils/types";

const DialogFoodQty = ({
  item,
  textRemaining = "Remaining after",
  sectionLabel = "Quantity",
  errors,
}: {
  item: FoodItemClient;
  textRemaining?: string;
  sectionLabel?: string;
  errors?: { quantity?: string[] };
}) => {
  const [quantity, setQuantity] = useState(Math.min(1, item.quantity));
  const remaining = Math.max(0, item.quantity - quantity);

  return (
    <div className="flex flex-col gap-1.5 mb-4 card-body">
      <p className="section-title text-xs">{sectionLabel}</p>
      <div className="flex justify-between items-center">
        <span>{textRemaining}</span>
        <span className="font-medium">
          {remaining} {item.unit}
          {(item.unit === "piece" || item.unit === "package") &&
            remaining > 1 &&
            "s"}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="input w-auto"
          min={item.unit === "piece" || item.unit === "package" ? 0.25 : 1}
          max={item.quantity}
          step={item.unit === "piece" || item.unit === "package" ? 0.25 : 1}
          required
          aria-invalid={!!errors?.quantity}
          aria-describedby={errors?.quantity ? "quantity-error" : undefined}
        />
      </div>
      <div className="flex justify-end">
        {errors?.quantity && (
          <small
            id="quantity-error"
            aria-live="polite"
            className="text-destructive text-xs"
          >
            {errors.quantity[0]}
          </small>
        )}
      </div>
    </div>
  );
};

export default DialogFoodQty;
