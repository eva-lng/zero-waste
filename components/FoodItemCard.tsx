"use client";
import { FoodItemClient } from "@/lib/utils/types";
import { getExpirationLabel } from "@/lib/utils/utilities";
import Link from "next/link";
import { FiMoreVertical } from "react-icons/fi";
import FoodDeleteButton from "./FoodDeleteButton";
import FoodConsumeButton from "./FoodConsumeButton";
import FoodExpireButton from "./FoodExpireButton";

const FoodItemCard = ({
  item,
  isOpen,
  onToggle,
}: {
  item: FoodItemClient;
  isOpen: boolean;
  onToggle: () => void;
}) => {
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
            <span>{getExpirationLabel(new Date(item.expirationDate))}</span>
            <span>{item.category}</span>
          </div>
        </Link>
        <div className="flex flex-col justify-between items-end">
          <button className="cursor-pointer" onClick={onToggle}>
            <FiMoreVertical />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="flex justify-between items-center">
          <FoodConsumeButton foodId={item._id} />
          <FoodExpireButton foodId={item._id} />
          <FoodDeleteButton foodId={item._id} name={item.name} />
        </div>
      )}
    </div>
  );
};

export default FoodItemCard;
