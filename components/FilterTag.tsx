import { FilterType } from "@/types/food";
import { capitalize } from "@/lib/utils/food";
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
    <div className="flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
      <span>{capitalize(value)}</span>
      <button
        className="cursor-pointer"
        onClick={() => removeFilter(type, value)}
      >
        <FiX />
      </button>
    </div>
  );
};

export default FilterTag;
