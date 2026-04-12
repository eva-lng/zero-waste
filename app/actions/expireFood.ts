"use server";
import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import FoodItem from "@/models/FoodItem";
import { revalidatePath } from "next/cache";
import { StatusType } from "@/lib/utils/types";

async function expireFood(foodId: string, formData: FormData) {
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

  const wasted = Number(formData.get("quantity"));

  if (!wasted || isNaN(wasted) || wasted <= 0) {
    throw new Error("Invalid quantity");
  }
  if (wasted > foodItem.quantity) {
    throw new Error("Exceeds available quantity");
    // todo: handle UI errors later:
    // useActionState, return { error: "Exceeds available quantity" };
  }

  const total = Math.max(0, foodItem.quantity - wasted);
  let status: StatusType = "active";
  if (total === 0) {
    status = "finished";
  }

  await foodItem.updateOne({
    quantity: total,
    wastedQty: foodItem.consumedQty + wasted,
    status: status,
  });

  revalidatePath("/items");
  revalidatePath("/dashboard");
}

export default expireFood;
