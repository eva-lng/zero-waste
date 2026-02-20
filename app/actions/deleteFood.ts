"use server";
import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import FoodItem from "@/models/FoodItem";
import { revalidatePath } from "next/cache";

async function deleteFood(formData: FormData) {
  await dbConnect();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;
  const foodId = formData.get("foodId") as string;

  await FoodItem.findOneAndDelete({
    _id: foodId,
    user: userId,
  });

  revalidatePath("/dashboard");
}

export default deleteFood;
