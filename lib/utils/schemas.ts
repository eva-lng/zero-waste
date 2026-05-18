import { z } from "zod";

const foodSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .trim()
    .min(1, "Name is required")
    .max(15, "Name can be 15 characters max"),
  category: z.enum([
    "fruits",
    "vegetables",
    "dairy",
    "grains",
    "meat",
    "other",
  ]),
  details: z.optional(z.string()),
  unit: z.enum(["piece", "package", "g", "ml"]),
  quantity: z
    .number({ error: "Quantity is required" })
    .min(1, "Quantity must be 1 or greater"),
  gramsPerUnit: z.number().min(1, "Grams per unit must be 1 or greater"),
  storage: z.enum(["pantry", "fridge", "freezer"]),
  isOpen: z.boolean(),
});
