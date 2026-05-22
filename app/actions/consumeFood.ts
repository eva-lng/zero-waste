"use server";
import dbConnect from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { qtyGramsMlSchema, qtyPiecePackageSchema } from "@/lib/utils/schemas";
import { z } from "zod";
import FoodItem from "@/models/FoodItem";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

  const consumed = validated.data.quantity;

  if (consumed > foodItem.quantity) {
    return {
      ...prevState,
      data: rawData,
      errors: { quantity: ["Exceeds available quantity"] },
      message: "",
    };
  }

  const total = Math.max(0, foodItem.quantity - consumed);
  const status: StatusType = total === 0 ? "finished" : "active";

  // const consumed =
  //   unit === "g" || unit === "ml"
  //     ? Math.round(Number(formData.get("quantity")))
  //     : Math.round(Number(formData.get("quantity")) * 4) / 4;

  // if (!consumed || isNaN(consumed) || consumed <= 0) {
  //   throw new Error("Invalid quantity");
  // }
  // if (consumed > foodItem.quantity) {
  //   throw new Error("Exceeds available quantity");
  //   // todo: handle UI errors later:
  //   // useActionState, return { error: "Exceeds available quantity" };
  // }

  // const total = Math.max(0, foodItem.quantity - consumed);
  // let status: StatusType = total === 0 ? "finished" : "active";

  await foodItem.updateOne({
    quantity: total,
    consumedGrams: foodItem.consumedGrams + consumed * foodItem.gramsPerUnit,
    status: status,
  });

  revalidatePath("/items");
  revalidatePath("/dashboard");
  redirect("/items");
}

export default consumeFood;
