import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import FoodItem from "@/models/FoodItem";
import Link from "next/link";
import { FoodItemType, StorageType } from "@/types/food";
import { isExpiringSoon } from "@/lib/utils/food";

const DashboardPage = async () => {
  await dbConnect();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;
  const foodItems = await FoodItem.find({ user: userId })
    .sort({ expirationDate: 1 })
    .lean<FoodItemType[]>();

  const storageCount: Record<StorageType, number> = {
    pantry: 0,
    fridge: 0,
    freezer: 0,
  };
  let soonCount = 0;

  for (const item of foodItems) {
    if (storageCount[item.storage] !== undefined) {
      storageCount[item.storage]++;
    }
    if (item.status === "active" && isExpiringSoon(item.expirationDate)) {
      soonCount++;
    }
  }

  return (
    <>
      <h2 className="text-3xl text-center">Dashboard</h2>

      <div className="flex flex-col sm:flex-row justify-around items-center gap-8 sm:gap-0 border border-amber-400">
        <section className="w-3xs border rounded p-2">
          <h3 className="border-b">Smart List</h3>
          <ul>
            <li className="flex justify-between">
              <Link href="/items">All</Link>
              <span>{foodItems.length}</span>
            </li>
            <li className="flex justify-between">
              <Link href="/items">Soon to expire</Link>
              <span>{soonCount}</span>
            </li>
            <li className="flex justify-between">
              <Link href="/items">Open</Link>
              <span>0</span>
            </li>
          </ul>
        </section>

        <section className="w-3xs border rounded p-2">
          <h3 className="border-b">Storages</h3>
          <ul>
            <li className="flex justify-between">
              <Link href="/items">Pantry</Link>
              <span>{storageCount.pantry}</span>
            </li>
            <li className="flex justify-between">
              <Link href="/items">Fridge</Link>
              <span>{storageCount.fridge}</span>
            </li>
            <li className="flex justify-between">
              <Link href="/items">Freezer</Link>
              <span>{storageCount.freezer}</span>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default DashboardPage;
