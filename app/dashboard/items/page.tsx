import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import FoodItem from "@/models/FoodItem";
import Link from "next/link";
import deleteFood from "@/app/actions/deleteFood";
import { FaCircleMinus } from "react-icons/fa6";
import { FoodItemType } from "@/types/food";
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

  return (
    <>
      <h2 className="text-3xl text-center">Items</h2>
      <div className="text-center text-blue-700">
        <Link href="/dashboard/add">Add Food</Link>
      </div>

      <ul>
        {foodItems.map((item) => (
          <li key={item._id} className="border-b flex gap-3 items-center">
            <div>
              <p>
                {item.name}
                {" ("}
                {item.storage}
                {") "}
              </p>
              <p>{new Date(item.expirationDate).toLocaleDateString()}</p>
            </div>
            <form action={deleteFood}>
              <input type="hidden" name="foodId" value={item._id.toString()} />
              <button type="submit" className="cursor-pointer">
                <FaCircleMinus className="text-red-600" />
              </button>
            </form>
          </li>
        ))}
      </ul>
      <ul>
        {foodItems.map((item) => (
          <li key={item._id}>
            <FoodItemCard item={item} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ItemsPage;
