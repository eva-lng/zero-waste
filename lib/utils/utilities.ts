import {
  ExpirationStateType,
  FoodItemDB,
  FoodItemClient,
} from "@/lib/utils/types";

export function isExpired(expirationDate: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const exp = new Date(expirationDate);
  exp.setHours(0, 0, 0, 0);

  return exp.getTime() < today.getTime();
}

export function isExpiringSoon(expirationDate: Date, days = 3): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const exp = new Date(expirationDate);
  exp.setHours(0, 0, 0, 0);

  const diffInMs = exp.getTime() - today.getTime();
  const maxMs = days * 1000 * 60 * 60 * 24;

  return diffInMs >= 0 && diffInMs <= maxMs;
}

export function getExpirationState(
  expirationDate: Date,
  soonDays = 3,
): ExpirationStateType {
  if (isExpired(expirationDate)) return "expired";
  if (isExpiringSoon(expirationDate, soonDays)) return "soon";
  return "fresh";
}

export function getDaysDifference(expirationDate: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exp = new Date(expirationDate);
  exp.setHours(0, 0, 0, 0);
  return Math.floor((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function getExpirationLabelShort(expirationDate: Date): string {
  const days = getDaysDifference(expirationDate);
  if (days < 0) return getExpiredLabelShort(expirationDate);
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days >= 60) return `In ${Math.floor(days / 30)} months`;
  if (days >= 30) return "In 1 month";
  return `In ${days} days`;
}

export function getExpirationLabelLong(expirationDate: Date): string {
  const days = getDaysDifference(expirationDate);
  if (days < 0) return getExpiredLabelLong(expirationDate);
  if (days === 0) return "Expires today";
  if (days === 1) return "Expires tomorrow";
  if (days >= 60) return `Expires in ${Math.floor(days / 30)} months`;
  if (days >= 30) return "Expires in 1 month";
  return `Expires in ${days} days`;
}

export function getExpiredLabelShort(expirationDate: Date): string {
  const days = -getDaysDifference(expirationDate);
  if (days === 1) return "Yesterday";
  if (days >= 60) return `${Math.floor(days / 30)} months ago`;
  if (days >= 30) return "1 month ago";
  return `${days} days ago`;
}

export function getExpiredLabelLong(expirationDate: Date): string {
  const days = -getDaysDifference(expirationDate);
  if (days === 1) return "Expired Yesterday";
  if (days >= 60) return `Expired ${Math.floor(days / 30)} months ago`;
  if (days >= 30) return "Expired 1 month ago";
  return `Expired ${days} days ago`;
}

export function capitalize(str: string): string {
  if (str.includes("&")) {
    return str
      .split(" & ")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" & ");
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function toClient(item: FoodItemDB): FoodItemClient {
  return {
    ...item,
    _id: item._id.toString(),
    user: item.user.toString(),
    expirationDate: item.expirationDate.toISOString(),
    openedAt: item.isOpen ? item.openedAt?.toISOString() : undefined,
    createdAt: item.createdAt.toISOString(),
    finishedAt: item.finishedAt?.toISOString(),
  };
}

export function sanitize(str: string) {
  return str.replace(/\s*&\s*/g, "-").replace(/\s+/g, "-");
}
