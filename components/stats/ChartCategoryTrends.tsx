"use client";
import { CategoryType, TrendsCategoryEntry } from "@/lib/utils/types";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const ChartCategoryTrends = ({
  categoryTrends,
}: {
  categoryTrends: Partial<Record<CategoryType, TrendsCategoryEntry[]>>;
}) => {
  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
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
          dataKey="desktop"
          fill="var(--color-desktop)"
          radius={8}
          width={12}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default ChartCategoryTrends;
