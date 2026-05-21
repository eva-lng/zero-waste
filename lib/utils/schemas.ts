import { z } from "zod";

const baseFields = {
  name: z
    .string()
    .trim()
    .min(1, "Required field")
    .max(30, "Name can be 30 characters max"),
  category: z.enum(
    ["fruits", "vegetables", "dairy", "grains", "meat", "other"],
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

export const qtyPiecePackageSchema = z.coerce
  .number({ error: "Quantity must be a number" })
  .min(0.25, "Minimum quantity is 1")
  .refine((n) => Number.isInteger(n * 4), "Must be in 0.25 increments");

export const qtyGramsMlSchema = z.coerce
  .number({ error: "Quantity must be a number" })
  .min(1, "Minimum quantity is 1")
  .int("Quantity must be a whole number");
