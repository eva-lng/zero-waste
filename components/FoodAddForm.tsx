"use client";
import { useState, useActionState, useRef } from "react";
import { useRouter } from "next/navigation";
import addFood from "@/app/actions/addFood";
import SubmitButton from "./SubmitButton";
import { capitalize } from "@/lib/utils/utilities";

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
    <form
      key={JSON.stringify(formState.data)}
      action={formAction}
      className="text-center"
      noValidate
    >
      <div className="mb-3">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-1.5">
          Food Item Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="border rounded py-1 px-2"
          placeholder="E.g. apple"
          defaultValue={formState.data.name}
          required
          aria-invalid={!!formState.errors?.name}
          aria-describedby={formState.errors?.name ? "name-error" : undefined}
        />
        <div>
          {formState.errors?.name && (
            <small id="name-error" aria-live="polite" className="text-red-500">
              {formState.errors.name[0]}
            </small>
          )}
        </div>
      </div>

      <div className="mb-3">
        <label
          htmlFor="category"
          className="block text-gray-700 font-bold mb-1.5"
        >
          Category
        </label>
        <select
          name="category"
          id="category"
          className="border rounded py-1 px-2"
          defaultValue={formState.data.category}
          required
          aria-invalid={!!formState.errors?.category}
          aria-describedby={
            formState.errors?.category ? "category-error" : undefined
          }
        >
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
          <option value="dairy">Dairy</option>
          <option value="grains">Grains</option>
          <option value="meat">Meat</option>
          <option value="other">Other</option>
        </select>
        <div>
          {formState.errors?.category && (
            <small
              id="category-error"
              aria-live="polite"
              className="text-red-500"
            >
              {formState.errors.category[0]}
            </small>
          )}
        </div>
      </div>

      <div className="mb-3">
        <label
          htmlFor="details"
          className="block text-gray-700 font-bold mb-1.5"
        >
          Details
        </label>
        <input
          type="text"
          id="details"
          name="details"
          className="border rounded py-1 px-2"
          placeholder="E.g. brand, flavor..."
          defaultValue={formState.data.details}
          aria-invalid={!!formState.errors?.details}
          aria-describedby={
            formState.errors?.details ? "details-error" : undefined
          }
        />
        <div>
          {formState.errors?.details && (
            <small
              id="details-error"
              aria-live="polite"
              className="text-red-500"
            >
              {formState.errors.details[0]}
            </small>
          )}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="unit" className="block text-gray-700 font-bold mb-1.5">
          Unit
        </label>
        <select
          name="unit"
          id="unit"
          className="border rounded py-1 px-2"
          defaultValue={formState.data.unit}
          onChange={(e) => {
            const val = e.target.value;
            setUnitLabel(val);
            setShowGramsPerUnit(val === "piece" || val === "package");
          }}
          required
          aria-invalid={!!formState.errors?.unit}
          aria-describedby={formState.errors?.unit ? "unit-error" : undefined}
        >
          <option value="piece">Piece</option>
          <option value="package">Package</option>
          <option value="g">g</option>
          <option value="ml">ml</option>
        </select>
        <div>
          {formState.errors?.unit && (
            <small id="unit-error" aria-live="polite" className="text-red-500">
              {formState.errors.unit[0]}
            </small>
          )}
        </div>
      </div>

      <div className="mb-3">
        <label
          htmlFor="quantity"
          className="block text-gray-700 font-bold mb-1.5"
        >
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          className="border rounded py-1 px-2"
          step={0.25}
          min={0.25}
          defaultValue={formState.data.quantity}
          required
          aria-invalid={!!formState.errors?.quantity}
          aria-describedby={
            formState.errors?.quantity ? "quantity-error" : undefined
          }
        />
        <div>
          {formState.errors?.quantity && (
            <small
              id="quantity-error"
              aria-live="polite"
              className="text-red-500"
            >
              {formState.errors.quantity[0]}
            </small>
          )}
        </div>
      </div>

      {showGramsPerUnit && (
        <div className="mb-3">
          <label
            htmlFor="gramsPerUnit"
            className="block text-gray-700 font-bold mb-1.5"
          >
            Grams per {capitalize(unitLabel)}
          </label>
          <input
            type="number"
            id="gramsPerUnit"
            name="gramsPerUnit"
            className="border rounded py-1 px-2"
            min={1}
            defaultValue={formState.data.gramsPerUnit}
            required
            aria-describedby={
              formState.errors?.gramsPerUnit ? "gramsPerUnit-error" : undefined
            }
          />
          <div>
            {formState.errors?.gramsPerUnit && (
              <small
                id="gramsPerUnit-error"
                aria-live="polite"
                className="text-red-500"
              >
                {formState.errors.gramsPerUnit[0]}
              </small>
            )}
          </div>
        </div>
      )}

      <div className="mb-3">
        <label
          htmlFor="expirationDate"
          className="block text-gray-700 font-bold mb-1.5"
        >
          Expiration Date
        </label>
        <input
          type="date"
          id="expirationDate"
          name="expirationDate"
          className="border rounded py-1 px-2"
          defaultValue={formState.data.expirationDate}
          required
          aria-invalid={!!formState.errors?.expirationDate}
          aria-describedby={
            formState.errors?.expirationDate
              ? "expirationDate-error"
              : undefined
          }
        />
        <div>
          {formState.errors?.expirationDate && (
            <small
              id="expirationDate-error"
              aria-live="polite"
              className="text-red-500"
            >
              {formState.errors.expirationDate[0]}
            </small>
          )}
        </div>
      </div>

      <div className="mb-3">
        <label
          htmlFor="storage"
          className="block text-gray-700 font-bold mb-1.5"
        >
          Storage
        </label>
        <select
          name="storage"
          id="storage"
          className="border rounded py-1 px-2"
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
        <div>
          {formState.errors?.storage && (
            <small
              id="storage-error"
              aria-live="polite"
              className="text-red-500"
            >
              {formState.errors.storage[0]}
            </small>
          )}
        </div>
      </div>

      <div className="mb-3">
        <fieldset
          aria-invalid={!!formState.errors?.isOpen}
          aria-describedby={
            formState.errors?.isOpen ? "isOpen-error" : undefined
          }
        >
          <label>
            <input
              type="radio"
              name="isOpen"
              value="false"
              defaultChecked={formState.data.isOpen === "false"}
            />{" "}
            Closed
          </label>
          <label className="ml-3">
            <input
              type="radio"
              name="isOpen"
              value="true"
              defaultChecked={formState.data.isOpen === "true"}
            />{" "}
            Open
          </label>
        </fieldset>
        <div>
          {formState.errors?.isOpen && (
            <small
              id="isOpen-error"
              aria-live="polite"
              className="text-red-500"
            >
              {formState.errors.isOpen[0]}
            </small>
          )}
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold cursor-pointer py-2 px-4 rounded-full focus:shadow-outline"
        >
          Cancel
        </button>

        <SubmitButton
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold cursor-pointer py-2 px-4 rounded-full focus:shadow-outline"
          pendingText="Adding..."
        >
          Add Food
        </SubmitButton>
      </div>
    </form>
  );
};

export default FoodAddForm;
