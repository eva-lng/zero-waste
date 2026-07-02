import {
  CategoryType,
  StorageType,
  ExpirationStateType,
} from "@/lib/utils/types";

export const CATEGORY_OPTIONS: CategoryType[] = [
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
];

export const STORAGE_OPTIONS: StorageType[] = ["fridge", "pantry", "freezer"];

export const EXPIRATION_OPTIONS: ExpirationStateType[] = [
  "fresh",
  "soon",
  "expired",
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const chartColors: Record<string, string> = {
  vegetables: "var(--chart-1)",
  fruits: "var(--chart-2)",
  "dairy-eggs": "var(--chart-3)",
  meat: "var(--chart-4)",
  seafood: "var(--chart-5)",
  "plant-based": "var(--chart-6)",
  "bread-pastry": "var(--chart-7)",
  "grains-pasta": "var(--chart-8)",
  "legumes-dried-foods": "var(--chart-9)",
  "nuts-seeds": "var(--chart-10)",
  "canned-goods": "var(--chart-11)",
  "baking-ingredients": "var(--chart-12)",
  "snacks-sweets": "var(--chart-13)",
  "prepared-meals": "var(--chart-14)",
  leftovers: "var(--chart-15)",
  condiments: "var(--chart-16)",
  spices: "var(--chart-17)",
  beverages: "var(--chart-18)",
  other: "var(--chart-19)",
  pantry: "var(--chart-20)",
  fridge: "var(--chart-21)",
  freezer: "var(--chart-22)",
};
