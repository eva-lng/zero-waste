import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";

import { getAllTimeStats } from "@/lib/data/stats";

const StatsPage = async () => {
  await dbConnect();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const totalData = await getAllTimeStats(userId);
  const [consumed, wasted] = [totalData[0].consumed, totalData[0].wasted];

  console.log(totalData);

  return (
    <>
      <h2 className="text-3xl text-center">Consumption and Waste Trends</h2>
      <div>
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
      </div>
    </>
  );
};

export default StatsPage;
