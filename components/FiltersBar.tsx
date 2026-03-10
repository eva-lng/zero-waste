"use client";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdFilterList } from "react-icons/md";
import FilterPanel from "./FilterPanel";
import FilterTag from "./FilterTag";

const FiltersBar = () => {
  const [open, setOpen] = useState(false);

  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const allParamsArr = Array.from(params.entries());
  console.log(allParamsArr);

  function removeFilter(type: string, value: string): void {
    const newParams = new URLSearchParams(params.toString());
    const values = newParams.getAll(type);

    if (values.includes(value)) {
      const filtered = values.filter((v) => value !== v);
      newParams.delete(type);
      filtered.forEach((v) => newParams.append(type, v));
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
          onClick={() => setOpen(!open)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold cursor-pointer py-2 px-4 rounded-full focus:shadow-outline"
        >
          <MdFilterList />
        </button>
      </div>

      {open && <FilterPanel />}

      {!open && (
        <div className="flex flex-wrap gap-2">
          {allParamsArr.map((param) => (
            <FilterTag
              key={`${param[0]}-${param[1]}`}
              param={param}
              removeFilter={removeFilter}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default FiltersBar;
