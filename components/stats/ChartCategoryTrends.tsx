"use client";
import { useState } from "react";
import { CategoryType, TrendsCategoryEntry } from "@/lib/utils/types";
import { chartColors } from "@/lib/utils/constants";
import { sanitize } from "@/lib/utils/utilities";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import CategoryTrendsStats from "./CategoryTrendsStats";
import StatsCategoryNavigator from "./StatsCategoryNavigator";

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
  const chartColorKey = sanitize(currentCategory);
  const isFirstCat = catIdx === 0;
  const isLastCat = catIdx === categories.length - 1;

  const handleNext = () => {
    setCatIdx((prev) => Math.min(categories.length - 1, prev + 1));
  };

  const handlePrev = () => {
    setCatIdx((prev) => Math.max(0, prev - 1));
  };

  const chartConfig = {
    wasted: {
      label: "Waste",
      color: chartColors[chartColorKey],
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
        <p className="text-muted-foreground text-xs md:text-sm font-medium mb-8">
          Waste trends by category • last{" "}
          {Object.values(categoryTrends)[0].length} months
        </p>

        {/* category navigator */}
        <StatsCategoryNavigator
          currentCategory={currentCategory}
          isFirstCat={isFirstCat}
          isLastCat={isLastCat}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />

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
              fill="var(--color-wasted)"
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
