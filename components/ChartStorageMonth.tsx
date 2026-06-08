"use client";
import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { StorageType } from "@/lib/utils/types";

const ChartStorageMonth = ({
  monthlyStorage,
  monthlyWaste,
}: {
  monthlyStorage: { storage: StorageType; wasted: number }[];
  monthlyWaste: number;
}) => {
  const chartData = monthlyStorage.map((item, i) => ({
    storage: item.storage,
    color: `var(--chart-${i + 13})`,
    wasted: item.wasted,
    percentage: Math.round((item.wasted / monthlyWaste) * 100),
    fill: `var(--color-${item.storage})`,
  }));

  const chartConfig: ChartConfig = { wasted: { label: "Waste" } };

  chartData.forEach((item, i) => {
    chartConfig[item.storage] = {
      label: item.storage,
      color: `var(--chart-${i + 13})`,
    };
  });

  return (
    <div role="region" aria-label="Monthly waste by storage chart">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[180px]"
      >
        <PieChart accessibilityLayer>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie data={chartData} dataKey="wasted" nameKey="storage" />
        </PieChart>
      </ChartContainer>

      <div className="flex justify-center">
        <ul
          className="mt-4 space-y-1 grid grid-cols-2 gap-x-4"
          aria-label="Chart legend"
        >
          {chartData.map((item) => (
            <li key={item.storage} className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-xs"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <span>{item.storage}</span>
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
