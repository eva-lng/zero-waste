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
    <div className="flex justify-between">
      <button
        disabled={isFirst}
        className="cursor-pointer"
        onClick={() =>
          router.push(
            `/stats?month=${prevYear}-${String(prevMonth).padStart(2, "0")}`,
          )
        }
      >
        <MdArrowBackIos />
      </button>
      <span>
        {MONTHS[month - 1]} {year}
      </span>
      <button
        disabled={isLast}
        className="cursor-pointer"
        onClick={() =>
          router.push(
            `/stats?month=${nextYear}-${String(nextMonth).padStart(2, "0")}`,
          )
        }
      >
        <MdArrowForwardIos />
      </button>
    </div>
  );
};

export default StatsMonthNavigator;
