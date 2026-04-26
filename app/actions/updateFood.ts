"use server";
import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import FoodItem from "@/models/FoodItem";
import { FoodItemDB } from "@/lib/utils/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function updateFood(foodId: string, formData: FormData) {
  await dbConnect();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;
  const existingFoodItem = await FoodItem.findById(foodId);

  // verify ownership
  if (!existingFoodItem) {
    throw new Error("Food not found");
  }
  if (existingFoodItem.user.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  const detailsValue = formData.get("details");
  const isOpenValue = formData.get("isOpen") === "true";
  const quantityValue = Math.round(Number(formData.get("quantity")) * 4) / 4;

  const foodData = {
    name: formData.get("name") as string,
    category: formData.get("category") as FoodItemDB["category"],
    details:
      typeof detailsValue === "string" && detailsValue.trim() !== ""
        ? detailsValue
        : undefined,
    unit: formData.get("unit") as FoodItemDB["unit"],
    quantity: quantityValue,
    expirationDate: new Date(formData.get("expirationDate") as string),
    storage: formData.get("storage") as FoodItemDB["storage"],
    isOpen: isOpenValue as boolean,
    openedAt:
      !existingFoodItem.openedAt && isOpenValue
        ? new Date()
        : existingFoodItem.openedAt && isOpenValue
          ? existingFoodItem.openedAt
          : undefined,
  } satisfies Partial<
    Omit<
      FoodItemDB,
      "_id" | "createdAt" | "status" | "consumedQty" | "wastedQty"
    >
  >;

  const updatedFood = await FoodItem.findByIdAndUpdate(foodId, foodData, {
    new: true,
  });

  revalidatePath("/items");
  revalidatePath("/dashboard");
  redirect(`/items/${updatedFood._id}`);
}

export default updateFood;
