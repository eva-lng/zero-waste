import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import FoodItem from "@/models/FoodItem";
import { capitalize } from "@/lib/utils/utilities";
import {
  getAllTimeStats,
  getMonthlyWaste,
  getMonthlyCategoryStats,
  getMonthlyStorageStats,
} from "@/lib/data/stats";
import ChartTotal from "@/components/ChartTotal";
import StatsMonthNavigator from "@/components/StatsMonthNavigator";
import ChartCategoryMonth from "@/components/ChartCategoryMonth";
import ChartStorageMonth from "@/components/ChartStorageMonth";

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

  const firstItem = await FoodItem.findOne({ user: userId }).sort({
    createdAt: 1,
  });

  const nowYear = new Date().getFullYear();
  const nowMonth = new Date().getMonth() + 1;
  const firstYear = firstItem?.createdAt.getFullYear() ?? nowYear;
  const firstMonth = firstItem ? firstItem?.createdAt.getMonth() + 1 : nowMonth;
  const isFirst = firstYear === yearVal && firstMonth === monthVal;
  const isLast = nowYear === yearVal && nowMonth === monthVal;

  const { consumed: totalConsumed, wasted: totalWasted } =
    await getAllTimeStats(userId);
  const monthlyWaste = await getMonthlyWaste(userId, yearVal, monthVal);
  const monthlyCategory = await getMonthlyCategoryStats(
    userId,
    yearVal,
    monthVal,
  );
  const monthlyStorage = await getMonthlyStorageStats(
    userId,
    yearVal,
    monthVal,
  );

  // console.log("totalConsumed:", totalConsumed, "totalWasted:", totalWasted);
  // console.log("monthlyWaste:", monthlyWaste);
  // console.log("monthlyCategory:", monthlyCategory);
  // console.log("monthlyStorage:", monthlyStorage);

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
          {/* LEFT */}
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

          {/* RIGHT */}
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
