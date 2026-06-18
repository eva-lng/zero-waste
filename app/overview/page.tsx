import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import FoodItem from "@/models/FoodItem";
import Link from "next/link";
import { FoodItemDB, StorageType } from "@/lib/utils/types";
import { isExpiringSoon, isExpired } from "@/lib/utils/utilities";
import { getAllTimeStats } from "@/lib/data/stats";

const OverviewPage = async () => {
  await dbConnect();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const { consumed: totalConsumed, wasted: totalWasted } =
    await getAllTimeStats(userId);
  const wastedPercentage = Math.round(
    (totalWasted * 100) / (totalConsumed + totalWasted),
  );

  const foodItems = await FoodItem.find({ user: userId, status: "active" })
    .sort({ expirationDate: 1 })
    .lean<FoodItemDB[]>();

  const storageCount: Record<StorageType, number> = {
    pantry: 0,
    fridge: 0,
    freezer: 0,
  };
  let soonCount = 0;
  let expiredCount = 0;
  let openCount = 0;

  for (const item of foodItems) {
    storageCount[item.storage]++;
    if (item.isOpen) {
      openCount++;
    }
    if (isExpired(item.expirationDate)) {
      expiredCount++;
    } else if (isExpiringSoon(item.expirationDate)) {
      soonCount++;
    }
  }

  return (
    <>
      <h2 className="text-3xl text-center">Overview</h2>

      <div className="flex justify-around mb-5">
        <section className="rounded-lg p-3 bg-muted">
          <p>Consumed</p>
          <p className="font-bold text-xl">{100 - wastedPercentage}%</p>
        </section>

        <section className="rounded-lg p-3 bg-muted">
          <p>Thrown</p>
          <p className="font-bold text-xl">{wastedPercentage}%</p>
        </section>
      </div>

      <div className="flex flex-col sm:flex-row justify-around items-center gap-8 sm:gap-0 ">
        <section className="w-3xs border rounded-lg p-2 bg-card">
          <h3 className="border-b">Smart List</h3>
          <ul>
            <li className="flex justify-between">
              <Link href="/inventory">All</Link>
              <span>{foodItems.length}</span>
            </li>
            <li className="flex justify-between">
              <Link href="/inventory?expiration=soon">Soon to expire</Link>
              <span>{soonCount}</span>
            </li>
            <li className="flex justify-between">
              <Link href="/inventory?expiration=expired">Expired</Link>
              <span>{expiredCount}</span>
            </li>
            <li className="flex justify-between">
              <Link href="/inventory?open=true">Open</Link>
              <span>{openCount}</span>
            </li>
          </ul>
        </section>

        <section className="w-3xs border rounded-lg p-2 bg-card">
          <h3 className="border-b">Storages</h3>
          <ul>
            <li className="flex justify-between">
              <Link href="/inventory?storage=pantry">Pantry</Link>
              <span>{storageCount.pantry}</span>
            </li>
            <li className="flex justify-between">
              <Link href="/inventory?storage=fridge">Fridge</Link>
              <span>{storageCount.fridge}</span>
            </li>
            <li className="flex justify-between">
              <Link href="/inventory?storage=freezer">Freezer</Link>
              <span>{storageCount.freezer}</span>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default OverviewPage;
