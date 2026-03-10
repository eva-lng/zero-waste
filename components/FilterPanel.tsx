"use client";
import { ReadonlyURLSearchParams } from "next/navigation";
import {
  CATEGORY_OPTIONS,
  STORAGE_OPTIONS,
  EXPIRATION_OPTIONS,
} from "@/constants/food";
import { FilterType } from "@/types/food";
import { capitalize } from "@/lib/utils/food";

const FilterPanel = ({
  params,
  toggleFilter,
}: {
  params: ReadonlyURLSearchParams;
  toggleFilter: (type: FilterType, value: string) => void;
}) => {
  const filterGroups: { type: FilterType; options: string[] }[] = [
    { type: "category", options: CATEGORY_OPTIONS },
    { type: "storage", options: STORAGE_OPTIONS },
    { type: "expiration", options: EXPIRATION_OPTIONS },
  ];

  return (
    <div className="border rounded-b-lg p-2">
      {filterGroups.map((group) => (
        <section key={group.type}>
          <h3>{capitalize(group.type)}</h3>

          <div className="grid grid-cols-2 md:grid-cols-3">
            {group.options.map((option) => {
              const checked = params.getAll(group.type).includes(option);
              return (
                <div key={option}>
                  <label
                    htmlFor={`${group.type}-${option}`}
                    className={`cursor-pointer px-1 py-0.5 rounded border ${checked ? "bg-blue-500 text-white border-blue-500" : "bg-white border-gray-300"}`}
                  >
                    <input
                      type="checkbox"
                      hidden
                      id={`${group.type}-${option}`}
                      checked={checked}
                      onChange={() => toggleFilter(group.type, option)}
                    />
                    {capitalize(option)}
                  </label>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default FilterPanel;
