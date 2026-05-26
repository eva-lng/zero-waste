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
