import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import FoodItem from "@/models/FoodItem";
import { capitalize, fillMissingMonths } from "@/lib/utils/utilities";
import { MONTHS } from "@/lib/utils/constants";
import {
  getAllTimeStats,
  getMonthlyWaste,
  getMonthlyCategoryStats,
  getMonthlyStorageStats,
  getMonthlyWasteTrends,
} from "@/lib/data/stats";
import ChartTotal from "@/components/stats/ChartTotal";
import StatsMonthNavigator from "@/components/stats/StatsMonthNavigator";
import ChartCategoryMonth from "@/components/stats/ChartCategoryMonth";
import ChartStorageMonth from "@/components/stats/ChartStorageMonth";

const StatsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) => {
  await dbConnect();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const { month } = await searchParams;
  const currentMonth =
    month ??
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  const [yearVal, monthVal] = currentMonth.split("-").map(Number);

  // DB fetch
  const [
    firstItem,
    { consumed: totalConsumed, wasted: totalWasted },
    monthlyWaste,
    monthlyCategory,
    monthlyStorage,
    monthlyWasteTrends,
  ] = await Promise.all([
    FoodItem.findOne({ user: userId }).sort({ createdAt: 1 }),
    getAllTimeStats(userId),
    getMonthlyWaste(userId, yearVal, monthVal),
    getMonthlyCategoryStats(userId, yearVal, monthVal),
    getMonthlyStorageStats(userId, yearVal, monthVal),
    getMonthlyWasteTrends(userId),
  ]);

  // date setup
  const nowYear = new Date().getFullYear();
  const nowMonth = new Date().getMonth() + 1;
  const firstYear = firstItem?.createdAt.getFullYear() ?? nowYear;
  const firstMonth = firstItem ? firstItem?.createdAt.getMonth() + 1 : nowMonth;
  const isFirst = firstYear === yearVal && firstMonth === monthVal;
  const isLast = nowYear === yearVal && nowMonth === monthVal;
  const monthsSinceCreation =
    (nowYear - firstYear) * 12 + (nowMonth - firstMonth) + 1;
  const fourMonthsAgo = new Date(nowYear, nowMonth - 3, 1);

  const avgMonthlyWaste = Math.round(totalWasted / monthsSinceCreation);

  // monthly waste trends
  const monthlyTrends = monthlyWasteTrends.reduce(
    (acc, item) => {
      const key = `${item.id.year}-${item.id.month}`;
      if (!acc[key])
        acc[key] = {
          date: { year: item.id.year, month: item.id.month },
          label: item.label,
          consumed: 0,
          wasted: 0,
        };
      acc[key].consumed += item.consumed;
      acc[key].wasted += item.wasted;
      return acc;
    },
    {} as Record<
      string,
      {
        date: { year: number; month: number };
        label: string;
        consumed: number;
        wasted: number;
      }
    >,
  );
  const monthlyTrendsArr = Object.values(monthlyTrends);
  const monthlyTrendsFilled = fillMissingMonths(
    monthlyTrendsArr,
    firstYear,
    firstMonth,
  );

  // category waste trends
  const categoryTrends = monthlyWasteTrends
    .filter((item) => {
      const itemDate = new Date(item.id.year, item.id.month, 1);
      return itemDate >= fourMonthsAgo;
    })
    .reduce(
      (acc, item) => {
        const cat = item.id.category;
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push({
          date: { year: item.id.year, month: item.id.month },
          label: item.label,
          consumed: item.consumed,
          wasted: item.wasted,
        });
        return acc;
      },
      {} as Record<
        string,
        {
          date: { year: number; month: number };
          label: string;
          consumed: number;
          wasted: number;
        }[]
      >,
    );
  // const lowestMonth =
  //   filledTrends.length > 0
  //     ? filledTrends.reduce((low, curr) =>
  //         curr.wasted < low.wasted ? curr : low,
  //       )
  //     : null;

  // console.log("totalConsumed:", totalConsumed, "totalWasted:", totalWasted);
  // console.log("monthlyWaste:", monthlyWaste);
  // console.log("monthlyCategory:", monthlyCategory);
  // console.log("monthlyStorage:", monthlyStorage);
  console.log("monthlyTrendsFilled:", monthlyTrendsFilled);
  console.log("categoryTrends:", categoryTrends);
  // console.log("average monthly waste:", avgMonthlyWaste);
  // console.log(
  //   "lowest month:",
  //   lowestMonth?.date.month,
  //   lowestMonth?.date.year,
  //   lowestMonth?.wasted,
  // );

  return (
    <>
      <h2 className="sr-only">Stats</h2>
      <section className="card mb-4">
        <h3 className="mb-4 section-title">
          Overall • since{" "}
          {session.user.createdAt.toLocaleDateString("en-GB", {
            month: "short",
            year: "numeric",
          })}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:items-center">
          {/* NUMBERS */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {/* total consumed */}
            <div className="stats-card">
              <p className="stat-label">Consumed</p>
              <p className="mt-1 stat-number">
                {totalConsumed + totalWasted > 0
                  ? Math.round(
                      (totalConsumed * 100) / (totalConsumed + totalWasted),
                    )
                  : 0}
                %
              </p>
              <p className="mt-1 text-xs md:text-sm text-muted-foreground">
                {totalConsumed} g
              </p>
            </div>
            {/* total wasted */}
            <div className="stats-card">
              <p className="stat-label">Wasted</p>
              <p className="mt-1 stat-number">
                {totalConsumed + totalWasted > 0
                  ? Math.round(
                      (totalWasted * 100) / (totalConsumed + totalWasted),
                    )
                  : 0}
                %
              </p>
              <p className="mt-1 text-xs md:text-sm text-muted-foreground">
                {totalWasted} g
              </p>
            </div>
          </div>

          {/* BAR CHART */}
          <div className="flex items-center">
            {totalConsumed + totalWasted > 0 && (
              <ChartTotal
                totalConsumed={totalConsumed}
                totalWasted={totalWasted}
              />
            )}
          </div>
        </div>
      </section>

      <section className="card">
        <div className="md:flex items-center justify-between mb-4">
          <h3 className="section-title mb-4 md:m-0">Monthly Breakdown</h3>
          <StatsMonthNavigator
            year={yearVal}
            month={monthVal}
            isFirst={isFirst}
            isLast={isLast}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="stats-card">
            <p className="stat-label">Total wasted</p>
            <p className="md:text-lg font-semibold">{monthlyWaste} g</p>
          </div>
          <div className="stats-card">
            <p className="stat-label">Top category</p>
            <p className="md:text-lg font-semibold">
              {monthlyCategory[0]?.category
                ? capitalize(monthlyCategory[0].category)
                : "-"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {monthlyCategory.length > 0 && monthlyStorage.length > 0 && (
            <>
              <div>
                <p className="text-muted-foreground text-xs md:text-sm font-medium">
                  Waste by category
                </p>
                <ChartCategoryMonth
                  monthlyCategory={monthlyCategory}
                  monthlyWaste={monthlyWaste}
                />
              </div>

              {/* horizontal divider on mobile */}
              <div className="border-t border-border md:hidden" />

              <div>
                <p className="text-muted-foreground text-xs md:text-sm font-medium md:mb-10">
                  Waste by storage
                </p>
                <ChartStorageMonth
                  monthlyStorage={monthlyStorage}
                  monthlyWaste={monthlyWaste}
                />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default StatsPage;
