import { FilterType } from "@/lib/utils/types";
import { capitalize } from "@/lib/utils/utilities";
import { TbX } from "react-icons/tb";

const FilterTag = ({
  type,
  value,
  removeFilter,
}: {
  type: FilterType;
  value: string;
  removeFilter: (type: FilterType, value: string) => void;
}) => {
  return (
    <span className="pill-base pill-light">
      {type === "open" ? capitalize(type) : capitalize(value)}
      <button
        className="flex items-center justify-center font-medium ml-1 w-3 h-3 hover:bg-[rgba(0,0,0,0.08)] cursor-pointer"
        onClick={() => removeFilter(type, value)}
      >
        <TbX />
      </button>
    </span>
  );
};

export default FilterTag;
