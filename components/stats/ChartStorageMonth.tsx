"use client";
import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import { StorageType } from "@/lib/utils/types";
import { capitalize } from "@/lib/utils/utilities";
import { chartColors } from "@/lib/utils/constants";

const ChartStorageMonth = ({
  monthlyStorage,
  monthlyWaste,
}: {
  monthlyStorage: { storage: StorageType; wasted: number }[];
  monthlyWaste: number;
}) => {
  const chartData = monthlyStorage.map((item, i) => ({
    storage: item.storage,
    color: chartColors[item.storage],
    wasted: item.wasted,
    percentage: Math.round((item.wasted / monthlyWaste) * 100),
    fill: `var(--color-${item.storage})`,
  }));

  const chartConfig: ChartConfig = { wasted: { label: "Waste" } };

  chartData.forEach((item, i) => {
    chartConfig[item.storage] = {
      label: item.storage,
      color: chartColors[item.storage],
    };
  });

  return (
    <div role="region" aria-label="Monthly waste by storage chart">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[220px]"
      >
        <PieChart accessibilityLayer>
          <ChartTooltip
            cursor={false}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              return (
                <div className="rounded-lg border bg-background px-2 py-1 shadow-sm">
                  {payload.map((entry) => (
                    <div
                      key={entry.name}
                      className="flex items-center gap-2 text-xs"
                    >
                      <span
                        className="inline-block w-3 h-3 rounded-xs"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-muted-foreground mr-1">
                        {capitalize(entry.payload.storage)}
                      </span>
                      <div>
                        <span className="font-medium font-mono mr-1">
                          {entry.value}g
                        </span>
                        <span className="text-muted-foreground font-mono">
                          ({entry.payload.percentage}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }}
          />
          <Pie data={chartData} dataKey="wasted" nameKey="storage" />
        </PieChart>
      </ChartContainer>

      <div className="mx-auto max-w-xs md:mt-5">
        <ul
          className="space-y-1 grid grid-cols-2 gap-x-8"
          aria-label="Storage chart legend"
        >
          {chartData.map((item) => (
            <li
              key={item.storage}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-xs"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <span>{capitalize(item.storage)}</span>
              </div>
              <span className="text-muted-foreground">{item.percentage}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChartStorageMonth;
