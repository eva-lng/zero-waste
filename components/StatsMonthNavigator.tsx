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

  return (
    <div className="flex justify-between">
      <button
        disabled={isFirst}
        className="cursor-pointer"
        onClick={() =>
          router.push(
            `/stats?month=${month === 1 ? year - 1 : year}-${String(month === 1 ? 12 : month - 1).padStart(2, "0")}`,
          )
        }
      >
        <MdArrowBackIos />
      </button>
      <h4>
        {MONTHS[month - 1]} {year}
      </h4>
      <button
        disabled={isLast}
        className="cursor-pointer"
        onClick={() =>
          router.push(
            `/stats?month=${month === 12 ? year + 1 : year}-${String(month === 12 ? 1 : month + 1).padStart(2, "0")}`,
          )
        }
      >
        <MdArrowForwardIos />
      </button>
    </div>
  );
};

export default StatsMonthNavigator;
