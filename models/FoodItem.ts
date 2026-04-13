import { Schema, model, models } from "mongoose";

const FoodItemSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    details: String,
    category: {
      type: String,
      enum: ["fruits", "vegetables", "dairy", "grains", "meat", "other"],
      required: true,
    },
    unit: {
      type: String,
      enum: ["piece", "package"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    storage: {
      type: String,
      enum: ["fridge", "pantry", "freezer"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "finished"],
      default: "active",
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    openedAt: {
      type: Date,
    },
    consumedQty: {
      type: Number,
      default: 0,
    },
    wastedQty: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

FoodItemSchema.index({ user: 1, expirationDate: 1 });

const FoodItem = models.FoodItem || model("FoodItem", FoodItemSchema);

export default FoodItem;
