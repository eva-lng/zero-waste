"use server";
import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createUnitSchema } from "@/lib/utils/schemas";
import { z } from "zod";
import FoodItem from "@/models/FoodItem";
import { revalidatePath } from "next/cache";
import { StatusType } from "@/lib/utils/types";

async function consumeFood(foodId: string, prevState: any, formData: FormData) {
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

  const schema = createUnitSchema(foodItem.unit, foodItem.quantity);
  const rawData = { quantity: formData.get("quantity") };
  const validated = schema.safeParse(rawData);

  if (!validated.success) {
    const flattened = z.flattenError(validated.error);
    return {
      ...prevState,
      data: rawData,
      errors: flattened.fieldErrors,
      successTimeStamp: 0,
    };
  }

  const consumed = validated.data.quantity;
  const total = Math.max(0, foodItem.quantity - consumed);
  const status: StatusType = total === 0 ? "finished" : "active";

  await foodItem.updateOne({
    quantity: total,
    consumedGrams: foodItem.consumedGrams + consumed * foodItem.gramsPerUnit,
    status: status,
    ...(status === "finished" && { finishedAt: new Date() }),
  });

  revalidatePath("/items");
  revalidatePath("/dashboard");
  return { data: { quantity: "" }, errors: {}, successTimeStamp: Date.now() };
}

export default consumeFood;
