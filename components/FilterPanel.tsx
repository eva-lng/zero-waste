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

  console.log(params.toString());
  console.log(pathname);

  function toggleFilter(type: FilterType, value: string): void {}

  return (
    <div className="border rounded-b-lg p-2">
      <section>
        <h3>Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0.5">
          {CATEGORY_OPTIONS.map((category) => (
            <div key={category}>
              <input
                type="checkbox"
                id={category}
                checked={params.getAll(category).includes(category)}
                onChange={() => toggleFilter("category", category)}
              />
              <label htmlFor={category}>{capitalize(category)}</label>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3>Storage</h3>
        <div className="grid grid-cols-2 md:grid-cols-3">
          {STORAGE_OPTIONS.map((storage) => (
            <div key={storage}>
              <input
                type="checkbox"
                id={storage}
                checked={params.getAll(storage).includes(storage)}
                onChange={() => toggleFilter("storage", storage)}
              />
              <label htmlFor={storage}>{capitalize(storage)}</label>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3>Expiration</h3>
        <div className="grid grid-cols-2 md:grid-cols-3">
          {EXPIRATION_OPTIONS.map((expiration) => (
            <div key={expiration}>
              <input
                type="checkbox"
                id={expiration}
                checked={params.getAll(expiration).includes(expiration)}
                onChange={() => toggleFilter("expiration", expiration)}
              />
              <label htmlFor={expiration}>{capitalize(expiration)}</label>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FilterPanel;
