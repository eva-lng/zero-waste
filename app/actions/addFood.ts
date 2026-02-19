"use server";
import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import FoodItem from "@/models/FoodItem";
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

  const foodData = {
    user: userId,
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    details:
      typeof detailsValue === "string" && detailsValue.trim() !== ""
        ? detailsValue
        : undefined,
    unit: formData.get("unit") as string,
    quantity: Number(formData.get("quantity")),
    expirationDate: new Date(formData.get("expirationDate") as string),
    storage: formData.get("storage") as string,
  };

  const newFood = await FoodItem.create(foodData);
  await newFood.save();

  redirect("/dashboard");
}

export default addFood;
