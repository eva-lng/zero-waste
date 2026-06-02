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

  const totalData = await getAllTimeStats(userId);
  const totalConsumed = totalData[0]?.consumed ?? 0;
  const totalWasted = totalData[0]?.wasted ?? 0;

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
  const topCategory =
    monthlyCategory.length > 0
      ? monthlyCategory.slice().sort((a, b) => b.wasted - a.wasted)[0]._id
      : null;
  const topStorage =
    monthlyStorage.length > 0
      ? monthlyStorage.slice().sort((a, b) => b.wasted - a.wasted)[0]._id
      : null;

  console.log("totalData:", totalData);
  console.log("monthlyWaste:", monthlyWaste);
  console.log("monthlyCategory:", monthlyCategory);
  console.log("monthlyStorage:", monthlyStorage);

  return (
    <>
      <h2 className="text-3xl text-center">Consumption and Waste Trends</h2>
      <section className="mb-5">
        <h3>Overall stats</h3>
        <p>Total consumed: {totalConsumed} grams</p>
        <p>Total wasted: {totalWasted} grams</p>
        <p>
          Waste percentage:{" "}
          {totalConsumed + totalWasted > 0
            ? (totalWasted * 100) / (totalConsumed + totalWasted)
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
          <p>Total wasted: {monthlyWaste[0]?.wasted ?? 0} grams</p>
          {topCategory && topStorage && (
            <>
              <p>Most wasted category: {topCategory}</p>
              <p>Most waste came from: {topStorage}</p>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default StatsPage;
