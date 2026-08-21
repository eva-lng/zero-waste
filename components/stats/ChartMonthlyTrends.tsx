"use client";
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
  monthlyTrends: {
    date: { year: number; month: number };
    label: string;
    consumed: number;
    wasted: number;
  }[];
}) => {
  // const chartData = [
  //   { label: "Aug 25", wasted: 850, consumed: 4200 },
  //   { label: "Sep 25", wasted: 1200, consumed: 5100 },
  //   { label: "Oct 25", wasted: 650, consumed: 3800 },
  //   { label: "Nov 25", wasted: 1450, consumed: 4700 },
  //   { label: "Dec 25", wasted: 1900, consumed: 5600 },
  //   { label: "Jan 26", wasted: 1100, consumed: 4300 },
  //   { label: "Feb 26", wasted: 750, consumed: 3900 },
  //   { label: "Mar 26", wasted: 500, consumed: 4500 },
  //   { label: "Apr 26", wasted: 1350, consumed: 5200 },
  //   { label: "May 26", wasted: 900, consumed: 4800 },
  //   { label: "Jun 26", wasted: 1700, consumed: 5700 },
  //   { label: "Jul 26", wasted: 600, consumed: 4100 },
  // ];
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
