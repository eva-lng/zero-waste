"use client";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterType } from "@/types/food";
import { MdFilterList } from "react-icons/md";
import FilterPanel from "./FilterPanel";
import FilterTag from "./FilterTag";

const FiltersBar = () => {
  const [open, setOpen] = useState(false);

  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilters = Array.from(params.entries()) as [FilterType, string][];

  function toggleFilter(type: FilterType, value: string): void {
    const newParams = new URLSearchParams(params.toString());
    const values = newParams.getAll(type);

    if (values.includes(value)) {
      newParams.delete(type);
      values
        .filter((v) => v !== value)
        .forEach((v) => newParams.append(type, v));
    } else {
      newParams.append(type, value);
    }
    router.replace(`${pathname}?${newParams.toString()}`);
  }

  return (
    <>
      <div className="flex items-center justify-center gap-3">
        <input type="search" className="border rounded px-2 py-1" />
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold cursor-pointer py-2 px-4 rounded-full focus:shadow-outline"
        >
          <MdFilterList />
        </button>
      </div>

      {open && <FilterPanel toggleFilter={toggleFilter} params={params} />}

      {!open && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map(([type, value]) => (
            <FilterTag
              key={`${type}-${value}`}
              type={type}
              value={value}
              removeFilter={toggleFilter}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default FiltersBar;
