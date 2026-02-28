import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import FoodItem from "@/models/FoodItem";
import { FoodItemType } from "@/types/food";

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
      <h1 className="text-center text-2xl font-bold mt-10">
        Property No Found
      </h1>
    );
  }

  return (
    <>
      <h2>{foodItem.name}</h2>
    </>
  );
};

export default FoodItemPage;
