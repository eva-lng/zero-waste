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
    <div id="filter-panel" className="bg-card border p-2 rounded-lg">
      <div role="tablist" className="flex justify-around border-b">
        {filterGroups.map((group) => (
          <button
            key={group.type}
            role="tab"
            id={`filter-tab-${group.type}`}
            aria-selected={activeSection === group.type}
            aria-controls={`filter-panel-${group.type}`}
            onClick={() => handleTabChange(group.type)}
          >
            {group.type === "open" ? "Status" : capitalize(group.type)}{" "}
            {params.getAll(group.type).length > 0 &&
              ` (${params.getAll(group.type).length})`}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        aria-labelledby={`filter-tab-${activeSection}`}
        id={`filter-panel-${activeSection}`}
        className="flex flex-wrap gap-3 justify-center py-2"
      >
        {filterGroups
          .find((g) => g.type === activeSection)
          ?.options.map((option) => {
            const checked = params.getAll(activeSection).includes(option);
            return (
              <label
                key={option}
                htmlFor={`${activeSection}-${option}`}
                className={`cursor-pointer text-sm px-3 py-1 rounded-full ${checked ? "bg-blue-500 text-white border border-blue-600" : "bg-slate-100 text-slate-600"}`}
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
