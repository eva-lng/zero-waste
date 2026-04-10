"use server";
import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import FoodItem from "@/models/FoodItem";
import { StorageType } from "@/lib/utils/types";
import { revalidatePath } from "next/cache";

async function updateFoodStorage(foodId: string, formData: FormData) {
  await dbConnect();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;
  const newStorage = formData.get("storage");
  const foodItem = await FoodItem.findById(foodId);

  if (!foodItem) {
    throw new Error("Food not found");
  }

  if (foodItem.user.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  await foodItem.updateOne({ storage: newStorage });

  revalidatePath("/items");
  revalidatePath("/dashboard");
}

export default updateFoodStorage;
