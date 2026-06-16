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
  const wastedPercentage = Math.round(
    (totalWasted * 100) / (totalConsumed + totalWasted),
  );

  const chartData = [
    {
      consumed: totalConsumed,
      consumedPercentage: 100 - wastedPercentage,
      wasted: totalWasted,
      wastedPercentage: wastedPercentage,
    },
  ];

  const chartConfig: ChartConfig = {
    consumed: {
      label: "Consumed",
      color: "var(--chart-0)",
    },
    wasted: {
      label: "Wasted",
      color: "var(--destructive)",
    },
  };

  return (
    <div
      className="w-[50%]"
      role="region"
      aria-label="Total consumed vs wasted chart"
    >
      <ChartContainer config={chartConfig} className="h-[40px] w-full">
        <BarChart layout="vertical" data={chartData} accessibilityLayer>
          <XAxis type="number" hide />
          <YAxis type="category" hide />
          <ChartTooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              return (
                <div className="rounded-lg border bg-background px-2 py-1 shadow-sm">
                  {payload.map((entry) => (
                    <div
                      key={entry.name}
                      className="flex items-center justify-between gap-3 text-xs"
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
                      <div>
                        <span className="font-medium font-mono mr-1">
                          {entry.value}g
                        </span>
                        <span className="text-muted-foreground font-mono">
                          ({entry.payload[`${entry.name}Percentage`]}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }}
          />
          {/* <ChartLegend content={<ChartLegendContent />} /> */}
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

      <div aria-label="Chart legend" className="flex justify-center">
        <ul className="mt-2 flex gap-6 text-xs">
          <li className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span
                className="inline-block w-2.5 h-2.5 rounded-xs"
                style={{ backgroundColor: "var(--chart-0)" }}
                aria-hidden="true"
              />
              <span>Consumed</span>
            </div>
            <span className="text-muted-foreground">
              {100 - wastedPercentage}%
            </span>
          </li>
          <li className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span
                className="inline-block w-2.5 h-2.5 rounded-xs"
                style={{ backgroundColor: "var(--destructive)" }}
                aria-hidden="true"
              />
              <span>Wasted</span>
            </div>
            <span className="text-muted-foreground">{wastedPercentage}%</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChartTotal;
