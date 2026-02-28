import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import FoodItem from "@/models/FoodItem";
import { FoodItemType } from "@/types/food";
import deleteFood from "@/app/actions/deleteFood";
import Link from "next/link";

const FoodItemPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  await dbConnect();
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;
  const foodItem = await FoodItem.findOne({
    _id: id,
    user: userId,
  }).lean<FoodItemType>();

  if (!foodItem) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">Food Not Found</h1>
    );
  }

  return (
    <>
      <section>
        <h2 className="text-xl border-b">
          {foodItem.name.charAt(0).toUpperCase() + foodItem.name.slice(1)}
        </h2>
        {foodItem.details && <p>{foodItem.details}</p>}
        <p>
          Expires on{" "}
          {new Date(foodItem.expirationDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p>Category: {foodItem.category}</p>
        <p>
          Amount: {foodItem.quantity} {foodItem.unit}
          {foodItem.quantity > 1 && "s"}
        </p>
        <p>Storage: {foodItem.storage}</p>

        <div className="flex items-center gap-3">
          <form action={deleteFood}>
            <input
              type="hidden"
              name="foodId"
              value={foodItem._id.toString()}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold cursor-pointer py-2 px-4 rounded-full focus:shadow-outline"
            >
              Delete
            </button>
          </form>
          <Link
            href={`/items/${foodItem._id}/edit`}
            className="bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer py-2 px-4 rounded-full focus:shadow-outline"
          >
            Edit
          </Link>
        </div>
      </section>
    </>
  );
};

export default FoodItemPage;
