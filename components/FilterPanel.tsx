"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  CATEGORY_OPTIONS,
  STORAGE_OPTIONS,
  EXPIRATION_OPTIONS,
} from "@/constants/food";
import { FilterType } from "@/types/food";
import { capitalize } from "@/lib/utils/food";

const FilterPanel = () => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function toggleFilter(type: FilterType, value: string): void {
    const newParams = new URLSearchParams(params.toString());
    const values = newParams.getAll(type);
    if (values.includes(value)) {
      const filtered = values.filter((v) => v !== value);
      newParams.delete(type);
      filtered.forEach((v) => newParams.append(type, v));
    } else {
      newParams.append(type, value);
    }
    router.replace(`${pathname}?${newParams.toString()}`);
  }

  const filterGroups = [
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
                    htmlFor={option}
                    className={`cursor-pointer px-1 py-0.5 rounded border ${checked ? "bg-blue-500 text-white border-blue-500" : "bg-white border-gray-300"}`}
                  >
                    <input
                      type="checkbox"
                      hidden
                      id={`${group.type}-${option}`}
                      checked={checked}
                      onChange={() =>
                        toggleFilter(group.type as FilterType, option)
                      }
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
