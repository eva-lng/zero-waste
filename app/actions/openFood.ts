"use server";
import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createUnitSchema, expirationDateSchema } from "@/lib/utils/schemas";
import { z } from "zod";
import FoodItem from "@/models/FoodItem";
import { FoodItemDB } from "@/lib/utils/types";
import { revalidatePath } from "next/cache";

async function openFood(foodId: string, prevState: any, formData: FormData) {
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

  const unitSchema = createUnitSchema(foodItem.unit, foodItem.quantity);
  const schema = z.object({
    ...unitSchema.shape,
    ...expirationDateSchema.shape,
  });
  const rawData = {
    quantity: formData.get("quantity"),
    expirationDate: formData.get("expirationDate"),
  };
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

  const opened = validated.data.quantity;
  const total = Math.max(0, foodItem.quantity - opened);

  if (total === 0) {
    await foodItem.updateOne({
      isOpen: true,
      openedAt: foodItem.openedAt ?? new Date(),
      expirationDate: validated.data.expirationDate,
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
      gramsPerUnit: foodItem.gramsPerUnit,
      expirationDate: validated.data.expirationDate,
      storage: foodItem.storage,
      isOpen: true,
      openedAt: new Date(),
    } satisfies Omit<
      FoodItemDB,
      "_id" | "createdAt" | "status" | "consumedGrams" | "wastedGrams"
    >;

    await FoodItem.create(newItem);
    await foodItem.updateOne({ quantity: total });
  }

  revalidatePath("/items");
  revalidatePath("/dashboard");
  return {
    data: { quantity: "", expirationDate: "" },
    errors: {},
    successTimeStamp: Date.now(),
  };
}

export default openFood;
