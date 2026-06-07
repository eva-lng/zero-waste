"use client";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { sanitize } from "@/lib/utils/utilities";
import { CategoryType } from "@/lib/utils/types";

const ChartCategoryMonth = ({
  monthlyCategory,
  monthlyWaste,
}: {
  monthlyCategory: { _id: CategoryType; wasted: number }[];
  monthlyWaste: number;
}) => {
  const chartData = monthlyCategory
    .sort((a, b) => a.wasted - b.wasted)
    .map((item, i) => ({
      category: sanitize(item._id),
      label: item._id,
      color: `var(--chart-${i + 1})`,
      wasted: item.wasted,
      percentage: Math.round((item.wasted / monthlyWaste) * 100 * 10) / 10,
      fill: `var(--color-${sanitize(item._id)})`,
    }));

  const chartConfig: ChartConfig = { wasted: { label: "Waste" } };

  chartData.forEach((item, i) => {
    chartConfig[item.category] = {
      label: item.label,
      color: `var(--chart-${i + 1})`,
    };
  });

  console.log("chartData:", chartData);
  console.log("chartConfig:", chartConfig);

  return (
    <div role="region" aria-label="Monthly waste by category chart">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[280px]"
      >
        <PieChart accessibilityLayer>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
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
                        className="fill-foreground text-3xl font-bold"
                      >
                        {monthlyWaste.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        grams of waste
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="flex justify-center" aria-label="Chart legend">
        <ul className="mt-4 space-y-1 grid grid-cols-2 gap-x-4">
          {[...chartData]
            .sort((a, b) => b.wasted - a.wasted)
            .map((item) => (
              <li
                key={item.category}
                className="flex items-center gap-3 text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-xs"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </div>
                <span className="text-muted-foreground">
                  {item.percentage}%
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ChartCategoryMonth;
