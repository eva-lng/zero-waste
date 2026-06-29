"use client";
import { useState } from "react";
import { FoodItemClient } from "@/lib/utils/types";
import {
  capitalize,
  getExpirationLabelLong,
  getExpirationLabelShort,
  getExpiryColor,
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
    <div className="card p-0">
      <div className="relative p-4">
        <button
          className="w-full text-left cursor-pointer"
          onClick={() => setDrawerOpen(true)}
          aria-label={`View details for ${item.name}`}
        >
          <span className="block card-title mb-0.5 md:mb-1">
            {capitalize(item.name)}
          </span>
          <span className="block card-meta mb-[1px] md:mb-0.5">
            {item.quantity} {item.unit}
            {(item.unit === "piece" || item.unit === "package") &&
              item.quantity > 1 &&
              "s"}
            {" • "}
            {item.category}
          </span>
          <span
            className={`block text-xs md:text-sm font-medium ${getExpiryColor(new Date(item.expirationDate))}`}
          >
            {getExpirationLabelLong(new Date(item.expirationDate))}
          </span>
        </button>

        <button
          className={`absolute top-4 right-3 cursor-pointer p-2 rounded-md hover:bg-muted ${isMenuOpen && "text-primary"}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          aria-label="Item actions"
        >
          <FiMoreVertical aria-hidden="true" />
        </button>
      </div>

      {isMenuOpen && <ActionMenu item={item} />}

      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        direction={isDesktop ? "right" : "bottom"}
      >
        <DrawerContent>
          <div
            className={`mx-auto w-full max-w-sm ${isDesktop ? "p-5 mt-10" : "p-4"}`}
          >
            <DrawerTitle className="sr-only">{item.name}</DrawerTitle>
            <DrawerDescription className="sr-only">
              Food item details
            </DrawerDescription>

            <div className="flex justify-between">
              <h3 className="card-title">{capitalize(item.name)}</h3>
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
            {item.isOpen && item.openedAt && (
              <div className="flex justify-between">
                <span>Opened</span>
                <span>
                  {new Date(item.openedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
            )}

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
