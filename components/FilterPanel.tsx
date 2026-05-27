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
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";

const FilterPanel = ({
  params,
  toggleFilter,
}: {
  params: ReadonlyURLSearchParams;
  toggleFilter: (type: FilterType, value: string) => void;
}) => {
  const [expandedSections, setExpandedSections] = useState<FilterType[]>([]);

  function toggleSection(type: FilterType) {
    setExpandedSections((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  }

  const filterGroups: { type: FilterType; options: string[] }[] = [
    { type: "category", options: CATEGORY_OPTIONS },
    { type: "storage", options: STORAGE_OPTIONS },
    { type: "expiration", options: EXPIRATION_OPTIONS },
    { type: "open", options: ["true"] },
  ];

  return (
    <div className="border rounded-lg p-2 text-center">
      {filterGroups.map((group) => (
        <section key={group.type}>
          <div className="flex justify-center gap-3">
            <h3>{group.type === "open" ? "Status" : capitalize(group.type)}</h3>
            <span className="">({params.getAll(group.type).length})</span>
            <button
              className="inline-flex items-center gap-1 cursor-pointer"
              onClick={() => toggleSection(group.type)}
            >
              {expandedSections.includes(group.type) ? (
                <RxTriangleUp />
              ) : (
                <RxTriangleDown />
              )}
            </button>
          </div>

          {expandedSections.includes(group.type) && (
            <div className="flex flex-wrap gap-3 justify-center py-2">
              {group.options.map((option) => {
                const checked = params.getAll(group.type).includes(option);
                return (
                  <div key={option}>
                    <label
                      htmlFor={`${group.type}-${option}`}
                      className={`cursor-pointer text-sm px-3 py-1 rounded-full ${checked ? "bg-blue-500 text-white border border-blue-600" : "bg-slate-100 text-slate-600"}`}
                    >
                      <input
                        type="checkbox"
                        hidden
                        id={`${group.type}-${option}`}
                        checked={checked}
                        onChange={() => toggleFilter(group.type, option)}
                      />
                      {option === "true" ? "Open" : capitalize(option)}
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

export default FilterPanel;
