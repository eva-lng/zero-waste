"use client";
import { TrendsCategoryEntry } from "@/lib/utils/types";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const ChartMonthlyTrends = ({
  monthlyTrends,
}: {
  monthlyTrends: TrendsCategoryEntry[];
}) => {
  const chartConfig = {
    consumed: {
      label: "Consumed",
      color: "var(--chart-1)",
    },
    wasted: {
      label: "Wasted",
      color: "var(--destructive)",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={monthlyTrends}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          angle={-45}
          textAnchor="end"
          height={50}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          width={35}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="consumed"
          type="monotone"
          stroke="var(--color-consumed)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="wasted"
          type="monotone"
          stroke="var(--color-wasted)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default ChartMonthlyTrends;
