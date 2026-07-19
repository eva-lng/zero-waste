import { Types } from "mongoose";
import dbConnect from "../mongodb";
import FoodItem from "@/models/FoodItem";
import { CategoryType, StorageType } from "../utils/types";

export async function getAllTimeStats(
  userId: string,
): Promise<{ consumed: number; wasted: number }> {
  await dbConnect();

  const res = await FoodItem.aggregate([
    {
      $match: { user: new Types.ObjectId(userId) },
    },
    {
      $group: {
        _id: null,
        consumed: { $sum: "$consumedGrams" },
        wasted: { $sum: "$wastedGrams" },
      },
    },
  ]);
  return {
    consumed: res[0]?.consumed ?? 0,
    wasted: res[0]?.wasted ?? 0,
  };
}

export async function getMonthlyWaste(
  userId: string,
  year: number,
  month: number,
): Promise<number> {
  await dbConnect();
  const startOfMonth = new Date(year, month - 1, 1);
  const startOfNextMonth = new Date(year, month, 1);

  const res = await FoodItem.aggregate([
    {
      $match: {
        user: new Types.ObjectId(userId),
        finishedAt: { $gte: startOfMonth, $lt: startOfNextMonth },
      },
    },
    {
      $group: {
        _id: null,
        wasted: { $sum: "$wastedGrams" },
      },
    },
  ]);
  return res[0]?.wasted ?? 0;
}

export async function getCategoryStats(userId: string): Promise<
  {
    category: CategoryType;
    consumed: number;
    wasted: number;
  }[]
> {
  await dbConnect();
  const res = await FoodItem.aggregate([
    {
      $match: { user: new Types.ObjectId(userId) },
    },
    {
      $group: {
        _id: "$category",
        consumed: { $sum: "$consumedGrams" },
        wasted: { $sum: "$wastedGrams" },
      },
    },
  ]);
  return res.length > 0
    ? res.map((item) => ({
        category: item._id,
        consumed: item.consumed,
        wasted: item.wasted,
      }))
    : [];
}

export async function getMonthlyCategoryStats(
  userId: string,
  year: number,
  month: number,
): Promise<{ category: CategoryType; wasted: number }[]> {
  await dbConnect();
  const startOfMonth = new Date(year, month - 1, 1);
  const startOfNextMonth = new Date(year, month, 1);

  const res = await FoodItem.aggregate([
    {
      $match: {
        user: new Types.ObjectId(userId),
        finishedAt: { $gte: startOfMonth, $lt: startOfNextMonth },
        wastedGrams: { $gt: 0 },
      },
    },
    {
      $group: {
        _id: "$category",
        wasted: { $sum: "$wastedGrams" },
      },
    },
    {
      $sort: {
        wasted: -1,
      },
    },
  ]);
  return res.length > 0
    ? res.map((item) => ({
        category: item._id,
        wasted: item.wasted,
      }))
    : [];
}

export async function getStorageStats(userId: string): Promise<
  {
    storage: StorageType;
    consumed: number;
    wasted: number;
  }[]
> {
  await dbConnect();
  const res = await FoodItem.aggregate([
    {
      $match: { user: new Types.ObjectId(userId) },
    },
    {
      $group: {
        _id: "$storage",
        consumed: { $sum: "$consumedGrams" },
        wasted: { $sum: "$wastedGrams" },
      },
    },
  ]);
  return res.length > 0
    ? res.map((item) => ({
        storage: item._id,
        consumed: item.consumed,
        wasted: item.wasted,
      }))
    : [];
}

export async function getMonthlyStorageStats(
  userId: string,
  year: number,
  month: number,
): Promise<{ storage: StorageType; wasted: number }[]> {
  await dbConnect();
  const startOfMonth = new Date(year, month - 1, 1);
  const startOfNextMonth = new Date(year, month, 1);

  const res = await FoodItem.aggregate([
    {
      $match: {
        user: new Types.ObjectId(userId),
        finishedAt: { $gte: startOfMonth, $lt: startOfNextMonth },
        wastedGrams: { $gt: 0 },
      },
    },
    {
      $group: {
        _id: "$storage",
        wasted: { $sum: "$wastedGrams" },
      },
    },
    {
      $sort: {
        wasted: -1,
      },
    },
  ]);
  return res.length > 0
    ? res.map((item) => ({
        storage: item._id,
        wasted: item.wasted,
      }))
    : [];
}
