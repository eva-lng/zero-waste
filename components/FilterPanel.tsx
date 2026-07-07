"use client";
import { useState } from "react";
import { ReadonlyURLSearchParams } from "next/navigation";
import {
  CATEGORY_OPTIONS,
  STORAGE_OPTIONS,
  EXPIRATION_OPTIONS,
} from "@/lib/utils/constants";
import { FilterType } from "@/lib/utils/types";
import { capitalize } from "@/lib/utils/utilities";
import { cn } from "@/lib/utils";

const FilterPanel = ({
  params,
  toggleFilter,
}: {
  params: ReadonlyURLSearchParams;
  toggleFilter: (type: FilterType, value: string) => void;
}) => {
  const [activeSection, setActiveSection] = useState<FilterType>("category");

  function handleTabChange(type: FilterType) {
    setActiveSection(type);
  }

  const filterGroups: { type: FilterType; options: string[] }[] = [
    { type: "category", options: CATEGORY_OPTIONS },
    { type: "storage", options: STORAGE_OPTIONS },
    { type: "expiration", options: EXPIRATION_OPTIONS },
    { type: "open", options: ["true"] },
  ];

  return (
    <div id="filter-panel" className="card pt-3 mb-3">
      <div role="tablist" className="flex gap-2 border-b mb-2">
        {filterGroups.map((group) => (
          <div
            key={group.type}
            className={
              activeSection === group.type ? "border-b-2 border-primary" : ""
            }
          >
            <button
              role="tab"
              id={`filter-tab-${group.type}`}
              aria-selected={activeSection === group.type}
              aria-controls={`filter-panel-${group.type}`}
              onClick={() => handleTabChange(group.type)}
              className={cn(
                "text-sm p-2 rounded-md hover:bg-muted cursor-pointer",
                activeSection === group.type
                  ? "text-primary-light-foreground"
                  : "text-muted-foreground",
              )}
            >
              {group.type === "open" ? "Status" : capitalize(group.type)}{" "}
              {params.getAll(group.type).length > 0 &&
                ` (${params.getAll(group.type).length})`}
            </button>
          </div>
        ))}
      </div>
      <div
        role="tabpanel"
        aria-labelledby={`filter-tab-${activeSection}`}
        id={`filter-panel-${activeSection}`}
        className="flex flex-wrap gap-2 pt-2"
      >
        {filterGroups
          .find((g) => g.type === activeSection)
          ?.options.map((option) => {
            const checked = params.getAll(activeSection).includes(option);
            return (
              <label
                key={option}
                htmlFor={`${activeSection}-${option}`}
                className={cn(
                  "pill-base pill-outline cursor-pointer",
                  checked &&
                    "bg-primary-light text-primary-light-foreground hover:bg-primary-light-hover border-none",
                )}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  id={`${activeSection}-${option}`}
                  checked={checked}
                  onChange={() => toggleFilter(activeSection, option)}
                />
                {option === "true" ? "Open" : capitalize(option)}
              </label>
            );
          })}
      </div>
    </div>
  );
};

export default FilterPanel;
