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
        <ChartTooltip
          cursor={false}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="rounded-lg border bg-background px-2 py-1 shadow-sm">
                <p className="text-xs font-medium mb-1">
                  {payload[0].payload.label}
                </p>
                {payload.map((entry) => (
                  <div
                    key={entry.name}
                    className="flex items-center justify-between gap-3 text-xs mb-0.5"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-3 h-3 rounded-xs"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-muted-foreground mr-1 capitalize">
                        {entry.name}
                      </span>
                    </div>
                    <span className="font-medium font-mono">
                      {entry.value}g
                    </span>
                  </div>
                ))}
              </div>
            );
          }}
        />
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
