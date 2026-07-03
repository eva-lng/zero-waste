"use client";
import { useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { FoodItemClient } from "@/lib/utils/types";
import {
  capitalize,
  getExpirationLabelLong,
  getExpirationLabelShort,
  getExpiryColor,
} from "@/lib/utils/utilities";
import { TbDotsVertical, TbDropletHalf2, TbEdit } from "react-icons/tb";
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
          <span className="flex items-baseline gap-1 card-title mb-0.5 md:mb-1">
            {capitalize(item.name)}
            {item.isOpen && <TbDropletHalf2 size={12} aria-hidden="true" />}
          </span>
          <span className="block card-meta md:text-sm mb-[1px] md:mb-0.5">
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
          <TbDotsVertical aria-hidden="true" />
        </button>
      </div>

      {isMenuOpen && <ActionMenu item={item} />}

      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        direction={isDesktop ? "right" : "bottom"}
      >
        <DrawerContent className="bg-card">
          <div
            className={`mx-auto w-full max-w-sm ${isDesktop ? "p-5 mt-10" : "p-4"}`}
          >
            <DrawerTitle className="sr-only">{item.name}</DrawerTitle>
            <DrawerDescription className="sr-only">
              Food item details
            </DrawerDescription>

            <div className="mb-4 relative">
              <div className="flex items-baseline gap-1">
                <h3 className="card-title mb-1">{capitalize(item.name)}</h3>
                {item.isOpen && <TbDropletHalf2 size={12} aria-hidden="true" />}
              </div>

              <p className="card-meta text-foreground">
                {capitalize(item.category)}
                {item.details && ` • ${capitalize(item.details)}`}
              </p>
              <Link
                href={`/inventory/${item._id}/edit`}
                aria-label={`Edit ${item.name}`}
                className="absolute top-0 right-0 rounded-md p-2 hover:bg-muted"
              >
                <TbEdit aria-hidden="true" />
              </Link>
            </div>

            <ActionMenu item={item} compact={isDesktop} />

            <div className="flex flex-col gap-1.5 my-4">
              <p className="section-title text-xs">Quantity</p>
              <div className="flex justify-between items-center card-body">
                <span>Amount</span>
                <span className="font-medium">
                  {item.quantity} {item.unit}
                </span>
              </div>
              {item.gramsPerUnit && (
                <div className="flex justify-between items-center card-body">
                  <span>Grams per {item.unit}</span>
                  <span className="font-medium">{item.gramsPerUnit} g</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              <p className="section-title text-xs">Storage & Status</p>
              <div className="flex justify-between card-body">
                <span>Storage</span>
                <span className="font-medium">{item.storage}</span>
              </div>
              <div className="flex justify-between items-center card-body">
                <span>Status</span>
                <span className="font-medium">
                  {item.isOpen ? "Open" : "Closed"}
                </span>
              </div>
              {item.isOpen && item.openedAt && (
                <div className="flex justify-between items-center card-body">
                  <span>Opened</span>
                  <span className="font-medium">
                    {new Date(item.openedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="section-title text-xs">Dates</p>
              <div className="flex justify-between items-center card-body">
                <span>Expires</span>
                <span
                  className={`font-medium ${getExpiryColor(new Date(item.expirationDate))}`}
                >
                  {getExpirationLabelShort(new Date(item.expirationDate))}
                </span>
              </div>
              <div className="flex justify-between items-center card-body">
                <span>Added</span>
                <span className="font-medium">
                  {new Date(item.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FoodItemCard;
