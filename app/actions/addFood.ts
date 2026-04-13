"use server";
import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import FoodItem from "@/models/FoodItem";
import { Types } from "mongoose";
import { FoodItemDB } from "@/lib/utils/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function addFood(formData: FormData) {
  await dbConnect();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  const detailsValue = formData.get("details");
  const isOpenValue = formData.get("isOpen") === "true";

  const foodData = {
    user: new Types.ObjectId(userId),
    name: formData.get("name") as string,
    category: formData.get("category") as FoodItemDB["category"],
    details:
      typeof detailsValue === "string" && detailsValue.trim() !== ""
        ? detailsValue
        : undefined,
    unit: formData.get("unit") as FoodItemDB["unit"],
    quantity: Number(formData.get("quantity")),
    expirationDate: new Date(formData.get("expirationDate") as string),
    storage: formData.get("storage") as FoodItemDB["storage"],
    isOpen: isOpenValue as boolean,
    openedAt: isOpenValue ? new Date() : undefined,
  } satisfies Omit<
    FoodItemDB,
    "_id" | "createdAt" | "status" | "consumedQty" | "wastedQty"
  >;

  const newFood = await FoodItem.create(foodData);
  await newFood.save();

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export default addFood;
