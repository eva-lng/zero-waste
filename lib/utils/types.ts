import { Types } from "mongoose";

export type StorageType = "pantry" | "fridge" | "freezer";

export type CategoryType =
  | "fruits"
  | "vegetables"
  | "dairy"
  | "grains"
  | "meat"
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
  consumedQty: number;
  wastedQty: number;
  createdAt: Date;
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
  consumedQty: number;
  wastedQty: number;
  createdAt: string;
}

export type ExpirationStateType = "fresh" | "soon" | "expired";

export type FilterType = "category" | "storage" | "expiration" | "open";
