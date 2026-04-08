"use client";
import { useState } from "react";
import { FoodItemDB } from "@/types/food";
import { getExpirationLabel } from "@/lib/utils/food";
import Link from "next/link";
import { FiMoreVertical } from "react-icons/fi";
import FoodDeleteButton from "./FoodDeleteButton";
import FoodConsumeButton from "./FoodConsumeButton";
import FoodExpireButton from "./FoodExpireButton";

const FoodItemCard = ({ item }: { item: FoodItemDB }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-500 rounded p-2 mb-2">
      <div className="flex justify-between ">
        <Link href={`/items/${item._id}`}>
          <div className="flex flex-col">
            <h3>{item.name}</h3>
            <span>
              {item.quantity} {item.unit}
              {item.quantity > 1 && "s"}
            </span>
            <span>{getExpirationLabel(item.expirationDate)}</span>
            <span>{item.category}</span>
          </div>
        </Link>
        <div className="flex flex-col justify-between items-end">
          <button
            className="cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <FiMoreVertical />
          </button>
        </div>
      </div>
      {open && (
        <div className="flex justify-between items-center">
          <FoodConsumeButton foodId={item._id.toString()} />
          <FoodExpireButton foodId={item._id.toString()} />
          <FoodDeleteButton foodId={item._id.toString()} name={item.name} />
        </div>
      )}
    </div>
  );
};

export default FoodItemCard;
