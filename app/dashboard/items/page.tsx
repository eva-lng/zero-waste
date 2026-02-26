import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import FoodItem from "@/models/FoodItem";
import Link from "next/link";
import { FoodItemType, StorageType } from "@/types/food";
import FoodItemCard from "@/components/FoodItemCard";

const ItemsPage = async () => {
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

  const itemsByStorage: Partial<Record<StorageType, FoodItemType[]>> = {};
  foodItems.forEach((item) => {
    const storage = item.storage as StorageType;
    itemsByStorage[storage] = itemsByStorage[storage] || [];
    itemsByStorage[storage].push(item);
  });

  return (
    <>
      <h2 className="text-3xl text-center">Items</h2>
      <div className="text-center text-blue-700">
        <Link href="/dashboard/add">Add Food</Link>
      </div>

      <div>
        {Object.keys(itemsByStorage).map((storage) => {
          const storageKey = storage as StorageType;
          return (
            <section key={storageKey}>
              <h3 className="text-xl">
                {storageKey.charAt(0).toUpperCase() + storageKey.slice(1)}
              </h3>
              <ul>
                {itemsByStorage[storageKey]?.map((item) => (
                  <li key={item._id}>
                    <FoodItemCard item={item} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
};

export default ItemsPage;
