"use server";
import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createUnitSchema, createStorageSchema } from "@/lib/utils/schemas";
import { z } from "zod";
import FoodItem from "@/models/FoodItem";
import { FoodItemDB, StorageType } from "@/lib/utils/types";
import { revalidatePath } from "next/cache";

async function moveFood(foodId: string, prevState: any, formData: FormData) {
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
  const storageSchema = createStorageSchema(foodItem.storage);
  const schema = z.object({
    ...unitSchema.shape,
    ...storageSchema.shape,
  });
  const rawData = {
    quantity: formData.get("quantity"),
    storage: formData.get("storage"),
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

  const newStorage = validated.data.storage;
  const moved = validated.data.quantity;
  const total = Math.round(Math.max(0, foodItem.quantity - moved) * 100) / 100;

  if (total === 0) {
    await foodItem.updateOne({ storage: newStorage });
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
      gramsPerUnit: foodItem.gramsPerUnit,
      expirationDate: foodItem.expirationDate,
      storage: newStorage,
      isOpen: foodItem.isOpen,
      openedAt: foodItem.openedAt,
    } satisfies Omit<
      FoodItemDB,
      "_id" | "createdAt" | "status" | "consumedGrams" | "wastedGrams"
    >;

    await FoodItem.create(newItem);
    await foodItem.updateOne({ quantity: total });
  }

  revalidatePath("/inventory");
  revalidatePath("/dashboard");
  return {
    data: { quantity: "", storage: "" },
    errors: {},
    successTimeStamp: Date.now(),
  };
}

export default moveFood;
