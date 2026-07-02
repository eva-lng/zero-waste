"use client";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterType } from "@/lib/utils/types";
import FilterPanel from "./FilterPanel";
import FilterTag from "./FilterTag";
import SearchBar from "./SearchBar";
import { TbAdjustmentsHorizontal } from "react-icons/tb";

const FiltersBar = () => {
  const [open, setOpen] = useState(false);

  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilters = Array.from(
    params.entries().filter(([type, _]) => type !== "search"),
  ) as [FilterType, string][];

  function toggleFilter(type: FilterType, value: string): void {
    const newParams = new URLSearchParams(params.toString());

    if (type === "open") {
      // for switching from open='true' to open='open' | 'closed'
      // const current = newParams.get(type);
      // if (current === value) {
      //   newParams.delete(type);
      // } else {
      //   newParams.set(type, value);
      // }

      newParams.get(type) === "true"
        ? newParams.delete(type)
        : newParams.set(type, value);
    } else {
      const values = newParams.getAll(type);

      if (values.includes(value)) {
        newParams.delete(type);
        values
          .filter((v) => v !== value)
          .forEach((v) => newParams.append(type, v));
      } else {
        newParams.append(type, value);
      }
    }
    router.replace(`${pathname}?${newParams.toString()}`);
  }

  return (
    <>
      <div className="flex gap-3 mb-3 md:w-[80%] md:mx-auto">
        <SearchBar />
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="btn-outline bg-card relative shrink-0 flex items-center gap-2"
          aria-expanded={open}
          aria-controls="filter-panel"
        >
          <TbAdjustmentsHorizontal />
          <span className="hidden md:inline">Filters</span>
          {activeFilters.length > 0 && (
            <span className="absolute md:static -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[11px] rounded-full w-4 h-4 flex items-center justify-center">
              {activeFilters.length}
            </span>
          )}
        </button>
      </div>

      {open && <FilterPanel toggleFilter={toggleFilter} params={params} />}

      {
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {activeFilters.map(([type, value]) => (
            <FilterTag
              key={`${type}-${value}`}
              type={type}
              value={value}
              removeFilter={toggleFilter}
            />
          ))}
          {activeFilters.length > 0 && (
            <button
              className="text-sm text-muted-foreground hover:underline ml-1 cursor-pointer"
              onClick={() => router.push("/inventory")}
            >
              Clear all
            </button>
          )}
        </div>
      }
    </>
  );
};

export default FiltersBar;
