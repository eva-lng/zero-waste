"use server";
import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import FoodItem from "@/models/FoodItem";
import { FoodItemDB } from "@/lib/utils/types";
import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

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
  const opened = Number(formData.get("quantity"));

  if (!opened || isNaN(opened) || opened <= 0) {
    throw new Error("Invalid quantity");
  }
  if (opened > foodItem.quantity) {
    throw new Error("Exceeds available quantity");
    // todo: handle UI errors later:
    // useActionState, return { error: "Exceeds available quantity" };
  }

  const total = Math.max(0, foodItem.quantity - opened);

  if (total === 0) {
    await foodItem.updateOne({
      isOpen: true,
      openedAt: foodItem.openedAt ?? new Date(),
      expirationDate: new Date(expirationDateValue as string),
    });
  } else {
    const newItem = {
      user: foodItem.user,
      name: foodItem.name,
      category: foodItem.category,
      details:
        typeof foodItem.details === "string" && foodItem.details.trim() !== ""
          ? foodItem.details
          : undefined,
      unit: foodItem.unit,
      quantity: opened,
      expirationDate: new Date(expirationDateValue as string),
      storage: foodItem.storage,
      isOpen: true,
      openedAt: new Date(),
    } satisfies Omit<
      FoodItemDB,
      "_id" | "createdAt" | "status" | "consumedQty" | "wastedQty"
    >;

    await FoodItem.create(newItem);
    await foodItem.updateOne({ quantity: total });
  }

  revalidatePath("/items");
  revalidatePath("/dashboard");
}

export default openFood;
