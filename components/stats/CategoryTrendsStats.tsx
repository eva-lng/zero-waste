import { CategoryType } from "@/lib/utils/types";

const CategoryTrendsStats = ({
  categoryStats,
  currentCategory,
}: {
  categoryStats: { category: CategoryType; consumed: number; wasted: number }[];
  currentCategory: string;
}) => {
  const currentCatStats = categoryStats.find(
    (item) => item.category === currentCategory,
  );

  // console.log("currentCategory:", currentCategory);
  // console.log("categoryStats:", categoryStats);

  return (
    <div className="order-2 grid grid-cols-3 md:order-1 md:grid-cols-1 gap-3">
      <div className="stats-card">
        <p className="stat-label">Consumed total</p>
        <p className="md:text-lg font-semibold">
          {currentCatStats?.consumed} g
        </p>
      </div>
      <div className="stats-card">
        <p className="stat-label">Wasted total</p>
        <p className="md:text-lg font-semibold">{currentCatStats?.wasted} g</p>
      </div>
      <div className="stats-card">
        <p className="stat-label">Waste rate</p>
        <p className="md:text-lg font-semibold text-destructive">
          {currentCatStats
            ? `${Math.round((currentCatStats?.wasted * 100) / currentCatStats?.consumed)}%`
            : "-"}
        </p>
      </div>
      <p className="col-span-3 md:col-span-1 text-muted-foreground text-xs mt-3">
        Totals are based on all recorded data for this category; the chart shows
        the most recent 4 months.
      </p>
    </div>
  );
};

export default CategoryTrendsStats;
