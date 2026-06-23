"use client";
import { useState } from "react";
import { FoodItemClient } from "@/lib/utils/types";
import {
  capitalize,
  getExpirationLabelLong,
  getExpirationLabelShort,
} from "@/lib/utils/utilities";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { FiMoreVertical } from "react-icons/fi";
import { TbEdit } from "react-icons/tb";
import FoodDeleteButton from "./FoodDeleteButton";
import FoodConsumeButton from "./FoodConsumeButton";
import FoodExpireButton from "./FoodExpireButton";
import FoodOpenButton from "./FoodOpenButton";
import FoodMoveButton from "./FoodMoveButton";
import ActionMenu from "./ActionMenu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { it } from "node:test";

const FoodItemCard = ({
  item,
  isMenuOpen,
  onToggle,
}: {
  item: FoodItemClient;
  isMenuOpen: boolean;
  onToggle: () => void;
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="relative bg-card border rounded p-2 mb-2">
      <button
        className="w-full text-left cursor-pointer"
        onClick={() => setDrawerOpen(true)}
      >
        <span className="block">{capitalize(item.name)}</span>
        <span className="block">
          {item.quantity} {item.unit}
          {(item.unit === "piece" || item.unit === "package") &&
            item.quantity > 1 &&
            "s"}{" "}
          • {capitalize(item.category)}
        </span>
        <span className="block">
          {getExpirationLabelLong(new Date(item.expirationDate))}
        </span>
      </button>

      <button
        className="absolute top-3 right-2 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        <FiMoreVertical />
      </button>

      {isMenuOpen && <ActionMenu item={item} />}

      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        direction={isDesktop ? "right" : "bottom"}
      >
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerTitle className="sr-only">{item.name}</DrawerTitle>

            <div className="flex justify-between">
              <h3>{capitalize(item.name)}</h3>
              <Link href={`/inventory/${item._id}/edit`}>
                <TbEdit />
              </Link>
            </div>
            <p>
              {capitalize(item.category)}
              {item.details && ` • ${capitalize(item.details)}`}
            </p>

            <ActionMenu item={item} />

            <h4>QUANTITY</h4>
            <div className="flex justify-between">
              <span>Amount</span>
              <span>
                {item.quantity} {item.unit}
              </span>
            </div>
            <div className="flex justify-between">
              {item.gramsPerUnit && <span>Grams per {item.unit}</span>}
              <span>{item.gramsPerUnit && item.gramsPerUnit} g</span>
            </div>

            <h4>STORAGE & STATUS</h4>
            <div className="flex justify-between">
              <span>Storage</span>
              <span>{item.storage}</span>
            </div>
            <div className="flex justify-between">
              <span>Status</span>
              <span>{item.isOpen ? "Open" : "Closed"}</span>
            </div>
            <div className="flex justify-between">
              {item.isOpen && <span>Opened</span>}
              {item.openedAt && (
                <span>
                  {new Date(item.openedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              )}
            </div>

            <h4>DATES</h4>
            <div className="flex justify-between">
              <span>Expires</span>
              <span>
                {getExpirationLabelShort(new Date(item.expirationDate))}
              </span>
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
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FoodItemCard;
