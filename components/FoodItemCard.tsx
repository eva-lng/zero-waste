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
import ActionMenu from "./ActionMenu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";

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
    <div className="relative bg-card border rounded-lg p-2 mb-2">
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
        aria-label="Item actions"
      >
        <FiMoreVertical aria-hidden="true" />
      </button>

      {isMenuOpen && <ActionMenu item={item} />}

      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        direction={isDesktop ? "right" : "bottom"}
      >
        <DrawerContent>
          <div
            className={`mx-auto w-full max-w-sm p-3 ${isDesktop && "p-5 mt-10"}`}
          >
            <DrawerTitle className="sr-only">{item.name}</DrawerTitle>
            <DrawerDescription className="sr-only">
              Food item details
            </DrawerDescription>

            <div className="flex justify-between">
              <h3>{capitalize(item.name)}</h3>
              <Link
                href={`/inventory/${item._id}/edit`}
                aria-label={`Edit ${item.name}`}
              >
                <TbEdit aria-hidden="true" />
              </Link>
            </div>
            <p>
              {capitalize(item.category)}
              {item.details && ` • ${capitalize(item.details)}`}
            </p>

            <ActionMenu item={item} compact={isDesktop} />

            <p>QUANTITY</p>
            <div className="flex justify-between">
              <span>Amount</span>
              <span>
                {item.quantity} {item.unit}
              </span>
            </div>
            {item.gramsPerUnit && (
              <div className="flex justify-between">
                <span>Grams per {item.unit}</span>
                <span>{item.gramsPerUnit} g</span>
              </div>
            )}

            <p>STORAGE & STATUS</p>
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

            <p>DATES</p>
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
