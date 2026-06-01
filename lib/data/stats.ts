import { Types } from "mongoose";
import dbConnect from "../mongodb";
import FoodItem from "@/models/FoodItem";

export async function getAllTimeStats(userId: string) {
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
  return res;
}

export async function getMonthlyWaste(
  userId: string,
  year: number,
  month: number,
) {
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
  return res;
}

export async function getCategoryStats(userId: string) {
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
  return res;
}

export async function getMonthlyCategoryStats(
  userId: string,
  year: number,
  month: number,
) {
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
        _id: "$category",
        wasted: { $sum: "$wastedGrams" },
      },
    },
  ]);
  return res;
}

export async function getStorageStats(userId: string) {
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
  return res;
}

export async function getMonthlyStorageStats(
  userId: string,
  year: number,
  month: number,
) {
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
        _id: "$storage",
        wasted: { $sum: "$wastedGrams" },
      },
    },
  ]);
  return res;
}
