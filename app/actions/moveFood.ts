"use server";
import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import FoodItem from "@/models/FoodItem";
import { FoodItemDB, StorageType } from "@/lib/utils/types";
import { revalidatePath } from "next/cache";

async function moveFood(foodId: string, formData: FormData) {
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

  const storageValue = formData.get("storage") as StorageType;
  const moved = Math.round(Number(formData.get("quantity")) * 10) / 10;

  if (storageValue === foodItem.storage) {
    throw new Error("Already in this storage");
    // return { error: "Already in this storage" }
  }

  if (!moved || isNaN(moved) || moved <= 0) {
    throw new Error("Invalid quantity");
  }
  if (moved > foodItem.quantity) {
    throw new Error("Exceeds available quantity");
    // todo: handle UI errors later:
    // useActionState, return { error: "Exceeds available quantity" };
  }

  const total = Math.max(0, foodItem.quantity - moved);

  if (total === 0) {
    await foodItem.updateOne({ storage: storageValue });
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
      quantity: moved,
      expirationDate: foodItem.expirationDate,
      storage: storageValue,
      isOpen: foodItem.isOpen,
      openedAt: foodItem.openedAt,
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

export default moveFood;
