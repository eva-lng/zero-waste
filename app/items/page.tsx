import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Link from "next/link";
import {
  FoodItemType,
  StorageType,
  ExpirationStateType,
  CategoryType,
} from "@/types/food";
import { getExpirationState, capitalize } from "@/lib/utils/food";
import FoodItem from "@/models/FoodItem";
import FoodItemCard from "@/components/FoodItemCard";
import FiltersBar from "@/components/FiltersBar";

const ItemsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    storage?: StorageType | StorageType[];
    expiration?: ExpirationStateType | ExpirationStateType[];
    category?: CategoryType | CategoryType[];
  }>;
}) => {
  await dbConnect();

  const { storage, expiration, category } = await searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const storageArray = Array.isArray(storage)
    ? storage
    : storage
      ? [storage]
      : [];
  const expirationArray = Array.isArray(expiration)
    ? expiration
    : expiration
      ? [expiration]
      : [];
  const categoryArray = Array.isArray(category)
    ? category
    : category
      ? [category]
      : [];

  let foodItems = await FoodItem.find({
    user: userId,
    status: "active",
    ...(storageArray.length > 0 ? { storage: { $in: storageArray } } : {}),
    ...(categoryArray.length > 0 ? { category: { $in: categoryArray } } : {}),
  })
    .sort({ expirationDate: 1 })
    .lean<FoodItemType[]>();

  // handle 'expiration' filter
  if (expirationArray.length > 0) {
    foodItems = foodItems.filter((item) =>
      expirationArray.includes(getExpirationState(item.expirationDate)),
    );
  }

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
        <Link href="/items/add">Add Food</Link>
      </div>
      <FiltersBar />

      <div>
        {Object.keys(itemsByStorage).map((storage) => {
          const storageKey = storage as StorageType;
          return (
            <section key={storageKey}>
              <h3 className="text-xl">{capitalize(storageKey)}</h3>
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
