"use client";
import { useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import addFood from "@/app/actions/addFood";
import SubmitButton from "./SubmitButton";
import { cn } from "@/lib/utils";

const initialState = {
  data: {
    name: "",
    category: "",
    details: "",
    unit: "piece",
    quantity: "",
    gramsPerUnit: "",
    expirationDate: "",
    storage: "",
    isOpen: "false",
  },
  errors: {},
  message: "",
};

const FoodAddForm = () => {
  const [formState, formAction, pending] = useActionState(
    addFood,
    initialState,
  );
  const [showGramsPerUnit, setShowGramsPerUnit] = useState(
    formState.data.unit === "piece" || formState.data.unit === "package",
  );
  const [unitLabel, setUnitLabel] = useState(formState.data.unit);

  const router = useRouter();

  return (
    <form key={JSON.stringify(formState.data)} action={formAction} noValidate>
      <div className="card">
        {/* name, category */}
        <div className="mb-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* food item name */}
          <div>
            <label htmlFor="name" className="block mb-1 text-xs font-medium">
              Food item name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={cn(
                "input",
                formState.errors?.name &&
                  "border-destructive focus-visible:ring-destructive",
              )}
              placeholder="E.g. apple"
              defaultValue={formState.data.name}
              required
              aria-invalid={!!formState.errors?.name}
              aria-describedby={
                formState.errors?.name ? "name-error" : undefined
              }
            />

            {formState.errors?.name && (
              <small
                id="name-error"
                aria-live="polite"
                className="block mt-1 text-destructive text-xs text-end"
              >
                {formState.errors.name[0]}
              </small>
            )}
          </div>

          {/* category */}
          <div>
            <label
              htmlFor="category"
              className="block mb-1 text-xs font-medium"
            >
              Category <span className="text-destructive">*</span>
            </label>
            <select
              name="category"
              id="category"
              className={cn(
                "select w-full",
                formState.errors?.category &&
                  "border-destructive focus-visible:ring-destructive",
              )}
              defaultValue={formState.data.category}
              required
              aria-invalid={!!formState.errors?.category}
              aria-describedby={
                formState.errors?.category ? "category-error" : undefined
              }
            >
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="dairy & eggs">Dairy & eggs</option>
              <option value="meat">Meat</option>
              <option value="seafood">Seafood</option>
              <option value="plant-based">Plant-based</option>
              <option value="bread & pastry">Bread & pastry</option>
              <option value="grains & pasta">Grains & pasta</option>
              <option value="legumes & dried foods">
                Legumes & dried foods
              </option>
              <option value="nuts & seeds">Nuts & seeds</option>
              <option value="canned goods">Canned goods</option>
              <option value="baking ingredients">Baking ingredients</option>
              <option value="snacks & sweets">Snacks & sweets</option>
              <option value="prepared meals">Prepared meals</option>
              <option value="leftovers">Leftovers</option>
              <option value="condiments">Condiments</option>
              <option value="spices">Spices</option>
              <option value="beverages">Beverages</option>
              <option value="other">Other</option>
            </select>
            {formState.errors?.category && (
              <small
                id="category-error"
                aria-live="polite"
                className="block mt-1 text-destructive text-xs text-end"
              >
                {formState.errors.category[0]}
              </small>
            )}
          </div>
        </div>

        {/* details */}
        <div className="mb-3">
          <label htmlFor="details" className="block mb-1 text-xs font-medium">
            Details <span className="text-muted-foreground">optional</span>
          </label>
          <input
            type="text"
            id="details"
            name="details"
            className={cn(
              "input",
              formState.errors?.details &&
                "border-destructive focus-visible:ring-destructive",
            )}
            placeholder="E.g. brand, flavor..."
            defaultValue={formState.data.details}
            aria-invalid={!!formState.errors?.details}
            aria-describedby={
              formState.errors?.details ? "details-error" : undefined
            }
          />
          {formState.errors?.details && (
            <small
              id="details-error"
              aria-live="polite"
              className="block mt-1 text-destructive text-xs text-end"
            >
              {formState.errors.details[0]}
            </small>
          )}
        </div>

        {/* unit, quantity */}
        <div className="mb-3 grid grid-cols-2 md:grid-cols-3 gap-3">
          {/* unit */}
          <div>
            <label htmlFor="unit" className="block mb-1 text-xs font-medium">
              Unit <span className="text-destructive">*</span>
            </label>
            <select
              name="unit"
              id="unit"
              className={cn(
                "select w-full",
                formState.errors?.unit &&
                  "border-destructive focus-visible:ring-destructive",
              )}
              defaultValue={formState.data.unit}
              onChange={(e) => {
                const val = e.target.value;
                setUnitLabel(val);
                setShowGramsPerUnit(val === "piece" || val === "package");
              }}
              required
              aria-invalid={!!formState.errors?.unit}
              aria-describedby={
                formState.errors?.unit ? "unit-error" : undefined
              }
            >
              <option value="piece">Piece</option>
              <option value="package">Package</option>
              <option value="g">g</option>
              <option value="ml">ml</option>
            </select>
            {formState.errors?.unit && (
              <small
                id="unit-error"
                aria-live="polite"
                className="block mt-1 text-destructive text-xs text-end"
              >
                {formState.errors.unit[0]}
              </small>
            )}
          </div>

          {/* quantity */}
          <div>
            <label
              htmlFor="quantity"
              className="block mb-1 text-xs font-medium"
            >
              Quantity <span className="text-destructive">*</span>
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className={cn(
                "input",
                formState.errors?.quantity &&
                  "border-destructive focus-visible:ring-destructive",
              )}
              step={0.25}
              min={0.25}
              defaultValue={formState.data.quantity}
              required
              aria-invalid={!!formState.errors?.quantity}
              aria-describedby={
                formState.errors?.quantity ? "quantity-error" : undefined
              }
            />
            {formState.errors?.quantity && (
              <small
                id="quantity-error"
                aria-live="polite"
                className="block mt-1 text-destructive text-xs text-end"
              >
                {formState.errors.quantity[0]}
              </small>
            )}
          </div>

          {/* grams per unit */}
          {showGramsPerUnit && (
            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="gramsPerUnit"
                className="block mb-1 text-xs font-medium"
              >
                Grams per {unitLabel}{" "}
                <span className="text-destructive">*</span>
              </label>
              <input
                type="number"
                id="gramsPerUnit"
                name="gramsPerUnit"
                className={cn(
                  "input",
                  formState.errors?.gramsPerUnit &&
                    "border-destructive focus-visible:ring-destructive",
                )}
                min={1}
                defaultValue={formState.data.gramsPerUnit}
                required
                aria-describedby={
                  formState.errors?.gramsPerUnit
                    ? "gramsPerUnit-error"
                    : undefined
                }
              />
              {formState.errors?.gramsPerUnit && (
                <small
                  id="gramsPerUnit-error"
                  aria-live="polite"
                  className="block mt-1 text-destructive text-xs text-end"
                >
                  {formState.errors.gramsPerUnit[0]}
                </small>
              )}
            </div>
          )}
        </div>

        {/* expiration date, storage, status */}
        <div className="grid grid-cols-2 gap-3">
          {/* expiration date */}
          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="expirationDate"
              className="block mb-1 text-xs font-medium"
            >
              Expiration Date <span className="text-destructive">*</span>
            </label>
            <input
              type="date"
              id="expirationDate"
              name="expirationDate"
              className={cn(
                "input",
                formState.errors?.expirationDate &&
                  "border-destructive focus-visible:ring-destructive",
              )}
              defaultValue={formState.data.expirationDate}
              required
              aria-invalid={!!formState.errors?.expirationDate}
              aria-describedby={
                formState.errors?.expirationDate
                  ? "expirationDate-error"
                  : undefined
              }
            />
            {formState.errors?.expirationDate && (
              <small
                id="expirationDate-error"
                aria-live="polite"
                className="block mt-1 text-destructive text-xs text-end"
              >
                {formState.errors.expirationDate[0]}
              </small>
            )}
          </div>

          {/* storage */}
          <div>
            <label htmlFor="storage" className="block mb-1 text-xs font-medium">
              Storage <span className="text-destructive">*</span>
            </label>
            <select
              name="storage"
              id="storage"
              className={cn(
                "input",
                formState.errors?.storage &&
                  "border-destructive focus-visible:ring-destructive",
              )}
              defaultValue={formState.data.storage}
              required
              aria-invalid={!!formState.errors?.storage}
              aria-describedby={
                formState.errors?.storage ? "storage-error" : undefined
              }
            >
              <option value="pantry">Pantry</option>
              <option value="fridge">Fridge</option>
              <option value="freezer">Freezer</option>
            </select>
            {formState.errors?.storage && (
              <small
                id="storage-error"
                aria-live="polite"
                className="block mt-1 text-destructive text-xs text-end"
              >
                {formState.errors.storage[0]}
              </small>
            )}
          </div>

          {/* status */}
          <div>
            <fieldset
              aria-invalid={!!formState.errors?.isOpen}
              aria-describedby={
                formState.errors?.isOpen ? "isOpen-error" : undefined
              }
            >
              <legend className="block mb-1 text-xs font-medium">
                Status <span className="text-destructive">*</span>
              </legend>
              <label className="text-sm">
                <input
                  type="radio"
                  name="isOpen"
                  value="false"
                  defaultChecked={formState.data.isOpen === "false"}
                />{" "}
                Closed
              </label>
              <label className="text-sm ml-4">
                <input
                  type="radio"
                  name="isOpen"
                  value="true"
                  defaultChecked={formState.data.isOpen === "true"}
                />{" "}
                Open
              </label>
            </fieldset>
            {formState.errors?.isOpen && (
              <small
                id="isOpen-error"
                aria-live="polite"
                className="block mt-1 text-destructive text-xs text-end"
              >
                {formState.errors.isOpen[0]}
              </small>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end mt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-outline"
        >
          Cancel
        </button>

        <SubmitButton className="btn-primary" pendingText="Adding...">
          Add Food
        </SubmitButton>
      </div>
    </form>
  );
};

export default FoodAddForm;
