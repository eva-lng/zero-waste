"use client";
import { useState } from "react";
import { MdFilterList } from "react-icons/md";
import FilterPanel from "./FilterPanel";

const FiltersBar = () => {
  const [open, setOpen] = useState(false);

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
    </>
  );
};

export default FiltersBar;
