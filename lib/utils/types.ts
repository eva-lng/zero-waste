import { Types } from "mongoose";

export type StorageType = "pantry" | "fridge" | "freezer";

export type CategoryType =
  | "vegetables"
  | "fruits"
  | "dairy & eggs"
  | "meat"
  | "seafood"
  | "plant-based"
  | "bread & pastry"
  | "grains & pasta"
  | "legumes & dried foods"
  | "nuts & seeds"
  | "canned goods"
  | "baking ingredients"
  | "snacks & sweets"
  | "prepared meals"
  | "leftovers"
  | "condiments"
  | "spices"
  | "beverages"
  | "other";

export type UnitType = "piece" | "package" | "g" | "ml";

export type StatusType = "active" | "finished";

export interface FoodItemDB {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  name: string;
  details?: string;
  category: CategoryType;
  unit: UnitType;
  quantity: number;
  gramsPerUnit?: number;
  expirationDate: Date;
  storage: StorageType;
  status: StatusType;
  isOpen: boolean;
  openedAt?: Date;
  consumedGrams: number;
  wastedGrams: number;
  createdAt: Date;
  finishedAt?: Date;
}

export interface FoodItemClient {
  _id: string;
  user: string;
  name: string;
  details?: string;
  category: CategoryType;
  unit: UnitType;
  quantity: number;
  gramsPerUnit?: number;
  expirationDate: string;
  storage: StorageType;
  status: StatusType;
  isOpen: boolean;
  openedAt?: string;
  consumedGrams: number;
  wastedGrams: number;
  createdAt: string;
  finishedAt?: string;
}

export type ExpirationStateType = "fresh" | "soon" | "expired";

export type FilterType = "category" | "storage" | "expiration" | "open";
