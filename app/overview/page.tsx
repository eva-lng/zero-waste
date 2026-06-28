import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import FoodItem from "@/models/FoodItem";
import Link from "next/link";
import { FoodItemDB, StorageType } from "@/lib/utils/types";
import {
  isExpiringSoon,
  isExpired,
  getExpirationLabelShort,
} from "@/lib/utils/utilities";
import { getAllTimeStats } from "@/lib/data/stats";
import { VscPieChart } from "react-icons/vsc";
import { HiArrowSmallRight } from "react-icons/hi2";

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
  const wastedPercentage =
    totalConsumed + totalWasted === 0
      ? 0
      : Math.round((totalWasted * 100) / (totalConsumed + totalWasted));

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

  const soonItems: FoodItemDB[] = foodItems
    .filter((item) => isExpiringSoon(item.expirationDate))
    .slice(0, 3);
  const expiredItems: FoodItemDB[] = foodItems
    .filter((item) => isExpired(item.expirationDate))
    .slice(0, 3);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
        <div className="stats-card">
          <p className="stat-label">Consumed</p>
          <p className="stat-number">
            {totalConsumed > 0 ? 100 - wastedPercentage : 0}%
          </p>
        </div>

        <div className="stats-card">
          <p className="stat-label">Thrown</p>
          <p className="stat-number">{wastedPercentage}%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-4 border border-blue-400">
        <nav aria-label="Inventory quick links" className="card">
          <p className="card-title border-b">Smart List</p>
          <ul className="card-body">
            <li className="flex justify-between">
              <Link href="/inventory">All</Link>
              <span className="text-medium">{foodItems.length}</span>
            </li>
            <li className="flex justify-between">
              <Link href="/inventory?expiration=soon">Expiring soon</Link>
              <span className="text-warning text-medium">{soonCount}</span>
            </li>
            <li className="flex justify-between">
              <Link href="/inventory?expiration=expired">Expired</Link>
              <span className="text-destructive-light-foreground text-medium">
                {expiredCount}
              </span>
            </li>
            <li className="flex justify-between">
              <Link href="/inventory?open=true">Open</Link>
              <span className="text-medium">{openCount}</span>
            </li>
          </ul>
        </nav>

        <nav aria-label="Storage quick links" className="card">
          <p className="card-title border-b">Storages</p>
          <ul className="card-body">
            <li className="flex justify-between">
              <Link href="/inventory?storage=pantry">Pantry</Link>
              <span className="text-medium">{storageCount.pantry}</span>
            </li>
            <li className="flex justify-between">
              <Link href="/inventory?storage=fridge">Fridge</Link>
              <span className="text-medium">{storageCount.fridge}</span>
            </li>
            <li className="flex justify-between">
              <Link href="/inventory?storage=freezer">Freezer</Link>
              <span className="text-medium">{storageCount.freezer}</span>
            </li>
          </ul>
        </nav>

        <div className="card hidden md:flex justify-center items-center">
          <Link
            href="/stats"
            className="flex flex-col items-center cursor-pointer"
          >
            <VscPieChart className="text-2xl" />
            <span className="flex items-center gap-0.5 text-sm">
              View full stats <HiArrowSmallRight aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>

      {(soonCount > 0 || expiredCount > 0) && (
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-2 md:gap-4">
          {soonCount > 0 && (
            <section className="border rounded-lg p-2 bg-card">
              <div className="flex justify-between border-b">
                <h2>Expiring soon</h2>
                <Link
                  href="/inventory?expiration=soon"
                  className="flex items-center gap-0.5"
                >
                  {soonCount} item{soonCount > 1 && "s"}
                  <HiArrowSmallRight aria-hidden="true" />
                </Link>
              </div>
              <ul>
                {soonItems.map((item) => (
                  <li
                    key={item._id.toString()}
                    className="flex justify-between"
                  >
                    <span>{item.name}</span>
                    <span>
                      {getExpirationLabelShort(new Date(item.expirationDate))}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {expiredCount > 0 && (
            <section className="border rounded-lg p-2 bg-card">
              <div className="flex justify-between border-b">
                <h2>Expired</h2>
                <Link
                  href="/inventory?expiration=expired"
                  className="flex items-center gap-0.5"
                >
                  {expiredCount} item{expiredCount > 1 && "s"}
                  <HiArrowSmallRight aria-hidden="true" />
                </Link>
              </div>
              <ul>
                {expiredItems.map((item) => (
                  <li
                    key={item._id.toString()}
                    className="flex justify-between"
                  >
                    <span>{item.name}</span>
                    <span>
                      {getExpirationLabelShort(new Date(item.expirationDate))}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </>
  );
};

export default OverviewPage;
