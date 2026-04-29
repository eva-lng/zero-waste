"use server";
import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import FoodItem from "@/models/FoodItem";
import { revalidatePath } from "next/cache";
import { StatusType } from "@/lib/utils/types";

async function consumeFood(foodId: string, formData: FormData) {
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

  const consumed = Math.round(Number(formData.get("quantity")) * 4) / 4;

  if (!consumed || isNaN(consumed) || consumed <= 0) {
    throw new Error("Invalid quantity");
  }
  if (consumed > foodItem.quantity) {
    throw new Error("Exceeds available quantity");
    // todo: handle UI errors later:
    // useActionState, return { error: "Exceeds available quantity" };
  }

  const total = Math.max(0, foodItem.quantity - consumed);
  let status: StatusType = total === 0 ? "finished" : "active";

  await foodItem.updateOne({
    quantity: total,
    consumedQty: foodItem.consumedQty + consumed,
    status: status,
  });

  revalidatePath("/items");
  revalidatePath("/dashboard");
}

export default consumeFood;
