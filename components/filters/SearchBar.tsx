"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { TbSearch } from "react-icons/tb";

const SearchBar = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const newParams = new URLSearchParams(params.toString());
    const trimmed = term.trim();

    if (trimmed) {
      newParams.set("search", trimmed);
    } else {
      newParams.delete("search");
    }
    router.replace(`${pathname}?${newParams.toString()}`);
  }, 400);

  return (
    <div className="relative flex-1 ">
      <TbSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={14}
        aria-hidden="true"
      />
      <input
        type="search"
        className="input pl-8 w-full"
        placeholder="Search items"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={params.get("search")?.toString()}
      />
    </div>
  );
};

export default SearchBar;
