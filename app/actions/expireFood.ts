"use server";
import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { qtyGramsMlSchema, qtyPiecePackageSchema } from "@/lib/utils/schemas";
import { z } from "zod";
import FoodItem from "@/models/FoodItem";
import { revalidatePath } from "next/cache";
import { StatusType } from "@/lib/utils/types";

async function expireFood(foodId: string, prevState: any, formData: FormData) {
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

  const unit = foodItem.unit;
  const schema =
    unit === "g" || unit === "ml" ? qtyGramsMlSchema : qtyPiecePackageSchema;
  const rawData = { quantity: formData.get("quantity") };
  const validated = schema.safeParse(rawData);

  if (!validated.success) {
    const flattened = z.flattenError(validated.error);
    return {
      ...prevState,
      data: rawData,
      errors: flattened.fieldErrors,
      message: "",
    };
  }

  const wasted = validated.data.quantity;

  if (wasted > foodItem.quantity) {
    return {
      ...prevState,
      data: rawData,
      errors: { quantity: ["Exceeds available quantity"] },
      message: "",
    };
  }

  const total = Math.max(0, foodItem.quantity - wasted);
  const status: StatusType = total === 0 ? "finished" : "active";

  await foodItem.updateOne({
    quantity: total,
    wastedGrams: foodItem.wastedGrams + wasted * foodItem.gramsPerUnit,
    status: status,
  });

  revalidatePath("/items");
  revalidatePath("/dashboard");
  return { data: { quantity: "" }, errors: {}, successTimeStamp: new Date() };
}

export default expireFood;
