"use server";
import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  qtyGramsMlSchema,
  qtyPiecePackageSchema,
  storageSchema,
} from "@/lib/utils/schemas";
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

  const unit = foodItem.unit;
  const unitSchema =
    unit === "g" || unit === "ml" ? qtyGramsMlSchema : qtyPiecePackageSchema;
  const schema = z.object({
    ...unitSchema.shape,
    ...storageSchema.shape,
  });
  const newStorage = formData.get("storage") as StorageType;
  const rawData = {
    quantity: formData.get("quantity"),
    storage: newStorage,
  };
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

  if (newStorage === foodItem.storage) {
    return {
      ...prevState,
      data: rawData,
      errors: { storage: ["Already in this storage"] },
      message: "",
    };
  }

  const moved = validated.data.quantity;

  if (moved > foodItem.quantity) {
    return {
      ...prevState,
      data: rawData,
      errors: { quantity: ["Exceeds available quantity"] },
      message: "",
    };
  }

  const total = Math.max(0, foodItem.quantity - moved);

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

  revalidatePath("/items");
  revalidatePath("/dashboard");
  return {
    data: { quantity: "", storage: "" },
    errors: {},
    successTimeStamp: new Date(),
  };
}

export default moveFood;
