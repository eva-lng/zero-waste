import { CategoryType, StorageType, ExpirationStateType } from "@/types/food";

export const CATEGORY_OPTIONS: CategoryType[] = [
  "fruits",
  "vegetables",
  "dairy",
  "grains",
  "meat",
  "other",
];

export const STORAGE_OPTIONS: StorageType[] = ["fridge", "pantry", "freezer"];

export const EXPIRATION_OPTIONS: ExpirationStateType[] = [
  "fresh",
  "soon",
  "expired",
];
