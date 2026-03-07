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

  return (
    <div className="border rounded-b-lg p-2">
      <section>
        <h3>Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3">
          {CATEGORY_OPTIONS.map((category) => (
            <div key={category}>
              <label
                htmlFor={category}
                className={`cursor-pointer px-1 py-0.5 rounded border ${params.getAll("category").includes(category) ? "bg-blue-500 text-white border-blue-500" : "bg-white border-gray-300"}`}
              >
                <input
                  type="checkbox"
                  hidden
                  id={category}
                  checked={params.getAll("category").includes(category)}
                  onChange={() => toggleFilter("category", category)}
                />
                {capitalize(category)}
              </label>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3>Storage</h3>
        <div className="grid grid-cols-2 md:grid-cols-3">
          {STORAGE_OPTIONS.map((storage) => (
            <div key={storage}>
              <label
                htmlFor={storage}
                className={`cursor-pointer px-1 py-0.5 rounded border ${params.getAll("storage").includes(storage) ? "bg-blue-500 text-white border-blue-500" : "bg-white border-gray-300"}`}
              >
                <input
                  type="checkbox"
                  hidden
                  id={storage}
                  checked={params.getAll("storage").includes(storage)}
                  onChange={() => toggleFilter("storage", storage)}
                />
                {capitalize(storage)}
              </label>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3>Expiration</h3>
        <div className="grid grid-cols-2 md:grid-cols-3">
          {EXPIRATION_OPTIONS.map((expiration) => (
            <div key={expiration}>
              <label
                htmlFor={expiration}
                className={`cursor-pointer px-1 py-0.5 rounded border ${params.getAll("expiration").includes(expiration) ? "bg-blue-500 text-white border-blue-500" : "bg-white border-gray-300"}`}
              >
                <input
                  type="checkbox"
                  hidden
                  id={expiration}
                  checked={params.getAll("expiration").includes(expiration)}
                  onChange={() => toggleFilter("expiration", expiration)}
                />
                {capitalize(expiration)}
              </label>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FilterPanel;
