"use server";
import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { foodSchema } from "@/lib/utils/schemas";
import { z } from "zod";
import FoodItem from "@/models/FoodItem";
import { FoodItemDB } from "@/lib/utils/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function updateFood(foodId: string, prevState: any, formData: FormData) {
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

  const rawData = {
    name: formData.get("name"),
    category: formData.get("category"),
    details: formData.get("details"),
    unit: formData.get("unit"),
    quantity: formData.get("quantity"),
    gramsPerUnit: formData.get("gramsPerUnit"),
    expirationDate: formData.get("expirationDate"),
    storage: formData.get("storage"),
    isOpen: formData.get("isOpen"),
  };

  console.log("rawData:", rawData);

  const validatedFields = foodSchema.safeParse(rawData);

  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);
    return {
      ...prevState,
      data: rawData,
      errors: flattened.fieldErrors,
      message: "",
    };
  }

  console.log("validatedFields.data:", validatedFields.data);

  const foodData = {
    ...validatedFields.data,
    gramsPerUnit: validatedFields.data.gramsPerUnit
      ? validatedFields.data.gramsPerUnit
      : 1,
    openedAt:
      !existingFoodItem.openedAt && validatedFields.data.isOpen
        ? new Date()
        : existingFoodItem.openedAt && validatedFields.data.isOpen
          ? existingFoodItem.openedAt
          : undefined,
  } satisfies Partial<
    Omit<
      FoodItemDB,
      "_id" | "createdAt" | "status" | "consumedGrams" | "wastedGrams"
    >
  >;

  console.log("foodData:", foodData);

  // const detailsValue = formData.get("details");
  // const isOpenValue = formData.get("isOpen") === "true";
  // const unitValue = formData.get("unit");
  // const quantityValue =
  //   unitValue === "g" || unitValue === "ml"
  //     ? Math.round(Number(formData.get("quantity")))
  //     : Math.round(Number(formData.get("quantity")) * 4) / 4;
  // const gramsPerUnitValue =
  //   unitValue === "g" || unitValue === "ml"
  //     ? 1
  //     : Number(formData.get("gramsPerUnit"));

  // const foodData = {
  //   name: formData.get("name") as string,
  //   category: formData.get("category") as FoodItemDB["category"],
  //   details:
  //     typeof detailsValue === "string" && detailsValue.trim() !== ""
  //       ? detailsValue
  //       : undefined,
  //   unit: unitValue as FoodItemDB["unit"],
  //   quantity: quantityValue,
  //   gramsPerUnit: gramsPerUnitValue,
  //   expirationDate: new Date(formData.get("expirationDate") as string),
  //   storage: formData.get("storage") as FoodItemDB["storage"],
  //   isOpen: isOpenValue,
  //   openedAt:
  //     !existingFoodItem.openedAt && isOpenValue
  //       ? new Date()
  //       : existingFoodItem.openedAt && isOpenValue
  //         ? existingFoodItem.openedAt
  //         : undefined,
  // } satisfies Partial<
  //   Omit<
  //     FoodItemDB,
  //     "_id" | "createdAt" | "status" | "consumedGrams" | "wastedGrams"
  //   >
  // >;

  const updatedFood = await FoodItem.findByIdAndUpdate(foodId, foodData, {
    new: true,
  });

  revalidatePath("/items");
  revalidatePath("/dashboard");
  redirect(`/items/${updatedFood._id}`);
}

export default updateFood;
