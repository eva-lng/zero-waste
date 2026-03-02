"use server";
import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import FoodItem from "@/models/FoodItem";
import { FoodItemType } from "@/types/food";
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

  const foodData: Partial<FoodItemType> = {
    name: formData.get("name") as string,
    category: formData.get("category") as FoodItemType["category"],
    details:
      typeof detailsValue === "string" && detailsValue.trim() !== ""
        ? detailsValue
        : undefined,
    unit: formData.get("unit") as FoodItemType["unit"],
    quantity: Number(formData.get("quantity")),
    expirationDate: new Date(formData.get("expirationDate") as string),
    storage: formData.get("storage") as FoodItemType["storage"],
    status: formData.get("status") as FoodItemType["status"],
  };

  const updatedFood = await FoodItem.findByIdAndUpdate(foodId, foodData, {
    new: true,
  });
  revalidatePath("/items");
  revalidatePath("/dashboard");
  redirect(`/items/${updatedFood._id}`);
}

export default updateFood;
