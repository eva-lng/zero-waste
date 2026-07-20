"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { MONTHS } from "@/lib/utils/constants";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";

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
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const prevYear = month === 1 ? year - 1 : year;
  const prevMonth = month === 1 ? 12 : month - 1;
  const nextYear = month === 12 ? year + 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;

  const handleNext = () => {
    startTransition(() => {
      router.push(
        `/stats?month=${nextYear}-${String(nextMonth).padStart(2, "0")}`,
      );
    });
  };

  const handlePrev = () => {
    startTransition(() => {
      router.push(
        `/stats?month=${prevYear}-${String(prevMonth).padStart(2, "0")}`,
      );
    });
  };

  return (
    <div className="flex items-center justify-between md:gap-10">
      <button
        disabled={isFirst || isPending}
        className={cn(
          "w-7 h-7 flex items-center justify-center border rounded-md hover:bg-muted cursor-pointer disabled:opacity-60 disabled:pointer-events-none",
          isFirst && "invisible",
        )}
        // "w-7 h-7 flex items-center justify-center border rounded-md hover:bg-muted cursor-pointer disabled:invisible"
        onClick={handlePrev}
      >
        <TbChevronLeft className="text-muted-foreground" />
      </button>
      <div className="relative flex items-center justify-center">
        {isPending && <Spinner className="absolute -left-6" />}
        <span className="text-[15px] font-medium">
          {MONTHS[month - 1]} {year}
        </span>
      </div>
      <button
        disabled={isLast || isPending}
        className={cn(
          "w-7 h-7 flex items-center justify-center border rounded-md hover:bg-muted cursor-pointer disabled:opacity-60 disabled:pointer-events-none",
          isLast && "invisible",
        )}
        // {`w-7 h-7 flex items-center justify-center border rounded-md hover:bg-muted cursor-pointer disabled:invisible ${isPending && "opacity-60 pointer-events-none disabled"}`}
        onClick={handleNext}
      >
        <TbChevronRight className="text-muted-foreground" />
      </button>
    </div>
  );
};

export default StatsMonthNavigator;
