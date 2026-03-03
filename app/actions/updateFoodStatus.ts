"use server";
import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import FoodItem from "@/models/FoodItem";
import { StatusType } from "@/types/food";
import { revalidatePath } from "next/cache";

async function updateFoodStatus(
  foodId: string,
  status: StatusType,
  _formData: FormData,
) {
  await dbConnect();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;
  const foodItem = await FoodItem.findById(foodId);

  if (!foodItem) {
    throw new Error("Food not found");
  }

  if (foodItem.user.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  await foodItem.updateOne({ status }, { new: true });

  revalidatePath("/items");
  revalidatePath("/dashboard");
}

export default updateFoodStatus;
