import { FilterType } from "@/lib/utils/types";
import { capitalize } from "@/lib/utils/utilities";
import { FiX } from "react-icons/fi";

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
        <FiX />
      </button>
    </span>
    // <div className="flex items-center gap-1 bg-primary-light hover:bg-primary-light-hover text-primary-light-foreground text-sm px-3 py-1 rounded-full">
    //   <span>{type === "open" ? capitalize(type) : capitalize(value)}</span>
    //   <button
    //     className="cursor-pointer hover:bg-[rgba(0,0,0,0.08)]"
    //     onClick={() => removeFilter(type, value)}
    //   >
    //     <FiX />
    //   </button>
    // </div>
  );
};

export default FilterTag;
