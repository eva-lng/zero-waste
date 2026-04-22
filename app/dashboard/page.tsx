import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import FoodItem from "@/models/FoodItem";
import Link from "next/link";
import { FoodItemDB, StorageType } from "@/lib/utils/types";
import { isExpiringSoon, isExpired } from "@/lib/utils/utilities";

const DashboardPage = async () => {
  await dbConnect();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;
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

      <Link
        href="/stats"
        className="block not-last:flex flex-row gap-5 border rounded p-2 mb-3"
      >
        <div className="flex flex-col border-r pr-4">
          <span>Consumed</span>
          <span>85%</span>
        </div>
        <div className="flex flex-col">
          <span>Thrown</span>
          <span>15%</span>
        </div>
      </Link>

      <div className="flex flex-col sm:flex-row justify-around items-center gap-8 sm:gap-0 ">
        <section className="w-3xs border rounded p-2">
          <h3 className="border-b">Smart List</h3>
          <ul>
            <li className="flex justify-between">
              <Link href="/items">All</Link>
              <span>{foodItems.length}</span>
            </li>
            <li className="flex justify-between">
              <Link href="/items?expiration=soon">Soon to expire</Link>
              <span>{soonCount}</span>
            </li>
            <li className="flex justify-between">
              <Link href="/items?expiration=expired">Expired</Link>
              <span>{expiredCount}</span>
            </li>
            <li className="flex justify-between">
              <Link href="/items?open=true">Open</Link>
              <span>{openCount}</span>
            </li>
          </ul>
        </section>

        <section className="w-3xs border rounded p-2">
          <h3 className="border-b">Storages</h3>
          <ul>
            <li className="flex justify-between">
              <Link href="/items?storage=pantry">Pantry</Link>
              <span>{storageCount.pantry}</span>
            </li>
            <li className="flex justify-between">
              <Link href="/items?storage=fridge">Fridge</Link>
              <span>{storageCount.fridge}</span>
            </li>
            <li className="flex justify-between">
              <Link href="/items?storage=freezer">Freezer</Link>
              <span>{storageCount.freezer}</span>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default DashboardPage;
