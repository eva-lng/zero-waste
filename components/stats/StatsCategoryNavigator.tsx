import { capitalize } from "@/lib/utils/utilities";
import { cn } from "@/lib/utils";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

const StatsCategoryNavigator = ({
  currentCategory,
  isFirstCat,
  isLastCat,
  handlePrev,
  handleNext,
}: {
  currentCategory: string;
  isFirstCat: boolean;
  isLastCat: boolean;
  handlePrev: () => void;
  handleNext: () => void;
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <button
        disabled={isFirstCat}
        className={cn(
          "w-6 h-6 flex items-center justify-center border rounded-md hover:bg-muted cursor-pointer disabled:opacity-60 disabled:pointer-events-none",
          isFirstCat && "invisible",
        )}
        onClick={handlePrev}
      >
        <TbChevronLeft className="text-muted-foreground" />
      </button>
      <div className="text-[15px] font-medium">
        {capitalize(currentCategory)}
      </div>
      <button
        disabled={isLastCat}
        className={cn(
          "w-6 h-6 flex items-center justify-center border rounded-md hover:bg-muted cursor-pointer disabled:opacity-60 disabled:pointer-events-none",
          isLastCat && "invisible",
        )}
        onClick={handleNext}
      >
        <TbChevronRight className="text-muted-foreground" />
      </button>
    </div>
  );
};

export default StatsCategoryNavigator;
