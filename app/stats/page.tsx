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

  console.log(firstItem);

  const firstYear = firstItem?.createdAt.getFullYear();
  const firstMonth = firstItem?.createdAt.getMonth() + 1;
  const nowYear = new Date().getFullYear();
  const nowMonth = new Date().getMonth() + 1;

  const isFirst = firstYear === yearVal && firstMonth === monthVal;
  const isLast = nowYear === yearVal && nowMonth === monthVal;

  const totalData = await getAllTimeStats(userId);
  const [consumed, wasted] = [totalData[0].consumed, totalData[0].wasted];
  const monthlyWaste = await getMonthlyWaste(userId, yearVal, monthVal);
  const monthlyCategory = await getMonthlyCategoryStats(
    userId,
    yearVal,
    monthVal,
  );

  console.log("totalData:", totalData);
  console.log("monthlyWaste:", monthlyWaste);
  console.log("monthlyCategory:", monthlyCategory);

  return (
    <>
      <h2 className="text-3xl text-center">Consumption and Waste Trends</h2>
      <section className="mb-5">
        <h3>Overall stats</h3>
        <p>Total consumed: {consumed} grams</p>
        <p>Total wasted: {wasted} grams</p>
        <p>Waste percentage: {(wasted * 100) / (consumed + wasted)}%</p>
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
      </section>
    </>
  );
};

export default StatsPage;
