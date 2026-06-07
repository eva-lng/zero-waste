"use client";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const ChartTotal = ({
  totalConsumed,
  totalWasted,
}: {
  totalConsumed: number;
  totalWasted: number;
}) => {
  const chartData = [
    {
      consumed: totalConsumed,
      wasted: totalWasted,
    },
  ];

  const chartConfig: ChartConfig = {
    consumed: {
      label: "Consumed",
      color: "var(--chart-1)",
    },
    wasted: {
      label: "Wasted",
      color: "var(--chart-2)",
    },
  };

  return (
    <div role="region" aria-label="Total consumed vs wasted chart">
      <ChartContainer config={chartConfig} className="h-[70px] w-[50%]">
        <BarChart layout="vertical" data={chartData} accessibilityLayer>
          <XAxis type="number" hide />
          <YAxis type="category" hide />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="consumed"
            stackId="a"
            fill="var(--color-consumed)"
            radius={[4, 0, 0, 4]}
          />
          <Bar
            dataKey="wasted"
            stackId="a"
            fill="var(--color-wasted)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ChartTotal;
