"use client";
import { useRouter } from "next/navigation";
import { MONTHS } from "@/lib/utils/constants";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const StatsMonthNavigator = ({
  year,
  month,
  isFirst,
  isLast,
}: {
  year: number;
  month: number;
  isFirst: boolean;
  isLast: boolean;
}) => {
  const router = useRouter();

  const prevYear = month === 1 ? year - 1 : year;
  const prevMonth = month === 1 ? 12 : month - 1;
  const nextYear = month === 12 ? year + 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;

  return (
    <div className="flex items-center justify-between md:gap-10">
      <button
        disabled={isFirst}
        className="w-7 h-7 flex items-center justify-center border rounded-md hover:bg-muted cursor-pointer disabled:invisible"
        onClick={() =>
          router.push(
            `/stats?month=${prevYear}-${String(prevMonth).padStart(2, "0")}`,
          )
        }
      >
        ‹
      </button>
      <span className="text-[15px] font-medium">
        {MONTHS[month - 1]} {year}
      </span>
      <button
        disabled={isLast}
        className="w-7 h-7 flex items-center justify-center border rounded-md hover:bg-muted cursor-pointer disabled:invisible"
        onClick={() =>
          router.push(
            `/stats?month=${nextYear}-${String(nextMonth).padStart(2, "0")}`,
          )
        }
      >
        ›
      </button>
    </div>
  );
};

export default StatsMonthNavigator;
