export type StorageType = "pantry" | "fridge" | "freezer";

export type CategoryType =
  | "fruits"
  | "vegetables"
  | "dairy"
  | "grains"
  | "meat"
  | "other";

export type UnitType = "piece" | "package";

export type StatusType = "active" | "consumed" | "expired";

export interface FoodItemType {
  _id: string;
  user: string;
  name: string;
  details?: string;
  category: CategoryType;
  unit: UnitType;
  quantity: number;
  expirationDate: Date;
  storage: StorageType;
  status: StatusType;
  createdAt: Date;
}
