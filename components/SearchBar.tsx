"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log("Searching...", term);
    const newParams = new URLSearchParams(params.toString());
    if (term) {
      newParams.set("search", term);
    } else {
      newParams.delete("search");
    }
    router.replace(`${pathname}?${newParams.toString()}`);
  }, 400);

  return (
    <input
      type="search"
      className="border rounded px-2 py-1"
      placeholder="Search your food..."
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={params.get("search")?.toString()}
    />
  );
};

export default SearchBar;
