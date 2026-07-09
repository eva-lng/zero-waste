"use client";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import { sanitize, capitalize } from "@/lib/utils/utilities";
import { CategoryType } from "@/lib/utils/types";
import { chartColors } from "@/lib/utils/constants";

const ChartCategoryMonth = ({
  monthlyCategory,
  monthlyWaste,
}: {
  monthlyCategory: { category: CategoryType; wasted: number }[];
  monthlyWaste: number;
}) => {
  const chartData = monthlyCategory.map((item) => {
    const key = sanitize(item.category);
    return {
      category: key,
      label: capitalize(item.category),
      color: chartColors[key],
      wasted: item.wasted,
      percentage: Math.round((item.wasted / monthlyWaste) * 100),
      fill: `var(--color-${key})`,
    };
  });

  const chartConfig: ChartConfig = { wasted: { label: "Waste" } };

  chartData.forEach((item, i) => {
    chartConfig[item.category] = {
      label: item.label,
      color: chartColors[item.category],
    };
  });

  return (
    <div role="region" aria-label="Monthly waste by category chart">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[280px]"
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
                        {entry.payload.label}
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
          <Pie
            data={chartData}
            dataKey="wasted"
            nameKey="category"
            innerRadius={70}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {monthlyWaste.toLocaleString()} g
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-foreground md:text-sm"
                      >
                        waste
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      <div className="mx-auto max-w-sm" aria-label="Category chart legend">
        <ul className="space-y-1 grid grid-cols-2 gap-x-8">
          {chartData.map((item) => (
            <li
              key={item.category}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-xs"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </div>
              <span className="text-muted-foreground">{item.percentage}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChartCategoryMonth;
