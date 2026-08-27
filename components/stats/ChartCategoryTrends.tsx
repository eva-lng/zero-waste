"use client";
import { useState } from "react";
import { CategoryType, TrendsCategoryEntry } from "@/lib/utils/types";
import { cn } from "@/lib/utils";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import CategoryTrendsStats from "./CategoryTrendsStats";

const ChartCategoryTrends = ({
  categoryTrends,
  categoryStats,
}: {
  categoryTrends: Partial<Record<CategoryType, TrendsCategoryEntry[]>>;
  categoryStats: { category: CategoryType; consumed: number; wasted: number }[];
}) => {
  const [catIdx, setCatIdx] = useState(0);

  const categories = Object.keys(categoryTrends) as CategoryType[];
  const currentCategory = categories[catIdx];
  const selectedCategory = categoryTrends[currentCategory];

  const handleNext = () => {
    setCatIdx((prev) => Math.min(categories.length - 1, prev + 1));
  };

  const handlePrev = () => {
    setCatIdx((prev) => Math.max(0, prev - 1));
  };

  // console.log(
  //   `selected category (${categories[catIdx]}):`,
  //   categoryTrends[categories[catIdx]],
  // );

  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
  ];
  const chartConfig = {
    wasted: {
      label: "Wasted",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <>
      {/* category consumed + wasted stats */}
      <CategoryTrendsStats
        categoryStats={categoryStats}
        currentCategory={currentCategory}
      />

      {/* waste trends category chart */}
      <div className="order-1 col-span-2 md:order-2">
        <p className="text-muted-foreground text-xs md:text-sm font-medium mb-10">
          Waste trends by category • last 4 months
        </p>

        {/* category navigator */}
        <div className="flex items-center justify-between md:gap-10">
          <button
            disabled={catIdx === 0}
            className={cn(
              "w-7 h-7 flex items-center justify-center border rounded-md hover:bg-muted cursor-pointer disabled:opacity-60 disabled:pointer-events-none",
              catIdx === 0 && "invisible",
            )}
            onClick={handlePrev}
          >
            <TbChevronLeft className="text-muted-foreground" />
          </button>
          {/* <div className="relative flex items-center justify-center">
              {isPending && <Spinner className="absolute -left-6" />}
              <span className="text-[15px] font-medium">
                {MONTHS[month - 1]} {year}
              </span>
            </div> */}
          <div className="text-[15px] font-medium">{currentCategory}</div>
          <button
            disabled={catIdx === categories.length - 1}
            className={cn(
              "w-7 h-7 flex items-center justify-center border rounded-md hover:bg-muted cursor-pointer disabled:opacity-60 disabled:pointer-events-none",
              catIdx === categories.length - 1 && "invisible",
            )}
            onClick={handleNext}
          >
            <TbChevronRight className="text-muted-foreground" />
          </button>
        </div>

        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={selectedCategory}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              width={40}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="wasted"
              fill="var(--color-desktop)"
              radius={8}
              width={12}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </>
  );
};

export default ChartCategoryTrends;
