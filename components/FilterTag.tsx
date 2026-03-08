import { capitalize } from "@/lib/utils/food";
import { FiX } from "react-icons/fi";

const FilterTag = ({
  param,
  removeFilter,
}: {
  param: [string, string];
  removeFilter: (type: string, value: string) => void;
}) => {
  return (
    <div className="flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
      <span>{capitalize(param[1])}</span>
      <button
        className="cursor-pointer"
        onClick={() => removeFilter(param[0], param[1])}
      >
        <FiX />
      </button>
    </div>
  );
};

export default FilterTag;
