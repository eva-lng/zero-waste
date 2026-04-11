"use server";
import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import FoodItem from "@/models/FoodItem";
import { revalidatePath } from "next/cache";

async function openFood(foodId: string, formData: FormData) {
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

  const expirationDateValue = formData.get("expirationDate");

  await foodItem.updateOne({
    isOpen: true,
    expirationDate: new Date(expirationDateValue as string),
  });

  revalidatePath("/items");
  revalidatePath("/dashboard");
}

export default openFood;
