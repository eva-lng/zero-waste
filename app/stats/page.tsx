import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import FoodItem from "@/models/FoodItem";
import {
  getAllTimeStats,
  getMonthlyWaste,
  getMonthlyCategoryStats,
  getMonthlyStorageStats,
} from "@/lib/data/stats";
import StatsMonthNavigator from "@/components/StatsMonthNavigator";
import ChartCategoryMonth from "@/components/ChartCategoryMonth";
import ChartStorageMonth from "@/components/ChartStorageMonth";
import ChartTotal from "@/components/ChartTotal";

const StatsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ month: string }>;
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

  console.log("totalConsumed:", totalConsumed, "totalWasted:", totalWasted);
  console.log("monthlyWaste:", monthlyWaste);
  console.log("monthlyCategory:", monthlyCategory);
  console.log("monthlyStorage:", monthlyStorage);

  return (
    <>
      <section className="rounded-lg bg-card border p-4 md:p-5">
        <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground tracking-wide uppercase">
          <h2>Overall</h2>
          <span>•</span>
          <p>
            since{" "}
            {session.user.createdAt.toLocaleDateString("en-GB", {
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:items-center">
          {/* LEFT */}
          <div className="flex gap-3">
            <div className="flex-1 rounded-md bg-muted p-4">
              <p className="text-muted-foreground text-sm">Consumed</p>
              <p className="mt-1 text-xl font-bold text-foreground">
                {totalConsumed + totalWasted > 0
                  ? Math.round(
                      (totalConsumed * 100) / (totalConsumed + totalWasted),
                    )
                  : 0}
                %
              </p>
              <p className="mt-1 text-sm text-muted-foreground-light">
                {totalConsumed} g
              </p>
            </div>

            <div className="flex-1 rounded-md bg-muted p-4">
              <p className="text-muted-foreground text-sm">Wasted</p>
              <p className="mt-1 text-xl font-bold text-foreground">
                {totalConsumed + totalWasted > 0
                  ? Math.round(
                      (totalWasted * 100) / (totalConsumed + totalWasted),
                    )
                  : 0}
                %
              </p>
              <p className="mt-1 text-sm text-muted-foreground-light">
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

      {/* <h2 className="text-3xl text-center">Consumption and Waste Trends</h2>
      <section className="mb-5">
        <h3>Overall stats</h3>
        <p>Total consumed: {totalConsumed} grams</p>
        <p>Total wasted: {totalWasted} grams</p>
        <p>
          Waste percentage:{" "}
          {totalConsumed + totalWasted > 0
            ? Math.round((totalWasted * 100) / (totalConsumed + totalWasted))
            : 0}
          %
        </p>
        <p>
          Since{" "}
          {session.user.createdAt.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        {totalConsumed + totalWasted > 0 && (
          <ChartTotal totalConsumed={totalConsumed} totalWasted={totalWasted} />
        )}
      </section>

      <section>
        <h3>Monthly breakdown</h3>
        <StatsMonthNavigator
          year={yearVal}
          month={monthVal}
          isFirst={isFirst}
          isLast={isLast}
        />
        <div>
          <p>Total wasted: {monthlyWaste} grams</p>
          {monthlyCategory.length > 0 && monthlyStorage.length > 0 && (
            <>
              <p>Most wasted category: {monthlyCategory[0].category}</p>
              <p>Most waste came from: {monthlyStorage[0].storage}</p>
              <ChartCategoryMonth
                monthlyCategory={monthlyCategory}
                monthlyWaste={monthlyWaste}
              />
              <ChartStorageMonth
                monthlyStorage={monthlyStorage}
                monthlyWaste={monthlyWaste}
              />
            </>
          )}
        </div>
      </section> */}
    </>
  );
};

export default StatsPage;
