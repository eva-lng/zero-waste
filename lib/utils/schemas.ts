import { z } from "zod";

const baseFields = {
  name: z
    .string()
    .trim()
    .min(1, "Required field")
    .max(30, "Name can be 30 characters max"),
  category: z.enum(
    [
      "vegetables",
      "fruits",
      "dairy & eggs",
      "meat",
      "seafood",
      "plant-based",
      "bread & pastry",
      "grains & pasta",
      "legumes & dried foods",
      "nuts & seeds",
      "canned goods",
      "baking ingredients",
      "snacks & sweets",
      "prepared meals",
      "leftovers",
      "condiments",
      "spices",
      "beverages",
      "other",
    ],
    { error: "Invalid category" },
  ),
  details: z
    .string()
    .trim()
    .max(80, "Details can be 80 characters max")
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  expirationDate: z.coerce.date("Invalid date").refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }, "Expiration date must be today or later"),
  storage: z.enum(["pantry", "fridge", "freezer"], {
    error: "Invalid storage",
  }),
  isOpen: z.string().transform((val) => val === "true"),
};

const piecePackageSchema = z.object({
  ...baseFields,
  unit: z.enum(["piece", "package"]),
  quantity: z.coerce
    .number({ error: "Quantity must be a number" })
    .min(0.25, "Minimum quantity is 0.25")
    .refine((n) => Number.isInteger(n * 4), "Must be in 0.25 increments"),
  gramsPerUnit: z.coerce
    .number({ error: "Grams per unit must be a number" })
    .int("Grams per unit must be a whole number")
    .min(1, "Grams per unit must be at least 1"),
});

const gramMlSchema = z.object({
  ...baseFields,
  unit: z.enum(["g", "ml"]),
  quantity: z.coerce
    .number({ error: "Quantity must be a number" })
    .int("Quantity must be a whole number")
    .min(1, "Minimum quantity is 1"),
  gramsPerUnit: z.any().optional(),
});

export const foodSchema = z.discriminatedUnion("unit", [
  piecePackageSchema,
  gramMlSchema,
]);

export const expirationDateSchema = z.object({
  expirationDate: z.coerce.date("Invalid date").refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }, "Expiration date must be today or later"),
});

export const createUnitSchema = (unit: string, maxQty: number) => {
  const baseQty =
    unit === "g" || unit === "ml"
      ? z.coerce
          .number({ error: "Quantity must be a number" })
          .min(1, "Minimum quantity is 1")
          .int("Quantity must be a whole number")
      : z.coerce
          .number({ error: "Quantity must be a number" })
          .min(0.25, "Minimum quantity is 0.25")
          .refine((n) => Number.isInteger(n * 4), "Must be in 0.25 increments");

  return z.object({
    quantity: baseQty.refine((n) => n <= maxQty, "Exceeds available quantity"),
  });
};

export const createStorageSchema = (currentStorage: string) =>
  z.object({
    storage: z
      .enum(["pantry", "fridge", "freezer"], {
        error: "Invalid storage",
      })
      .refine((s) => s !== currentStorage, "Already in this storage"),
  });

export const signupSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .regex(
      /[A-Z0-9]/,
      "Must contain at least one uppercase letter and one number",
    ),
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(30, "Name can be 30 characters max"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Minimum 8 characters")
      .regex(
        /[A-Z0-9]/,
        "Must contain at least one uppercase letter and one number",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const changeUsernameSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(30, "Name can be 30 characters max"),
});
