"use client";
import { useState, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import addFood from "@/app/actions/addFood";
import SubmitButton from "./SubmitButton";
import { capitalize } from "@/lib/utils/utilities";

const initialState = {
  data: {
    name: "",
    category: "",
    details: "",
    unit: "",
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
  const [unit, setUnit] = useState(formState.data.unit || "piece");

  const router = useRouter();

  useEffect(() => {
    console.log("formState: ", formState);
    // setUnit(formState.data.unit || "piece");
  }, [formState]);

  return (
    <form
      key={JSON.stringify(formState.data)}
      action={formAction}
      className="text-center"
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
          // required
        />
        <div>
          {formState.errors?.name && (
            <small className="text-red-500">{formState.errors.name[0]}</small>
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
          // required
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
            <small className="text-red-500">
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
        />
        <div>
          {formState.errors?.details && (
            <small className="text-red-500">
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
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          // required
        >
          <option value="piece">Piece</option>
          <option value="package">Package</option>
          <option value="g">g</option>
          <option value="ml">ml</option>
        </select>
        <div>
          {formState.errors?.unit && (
            <small className="text-red-500">{formState.errors.unit[0]}</small>
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
          // min={unit === "piece" || unit === "package" ? 0.25 : 1}
          // step={unit === "piece" || unit === "package" ? 0.25 : 1}
          step={0.25}
          defaultValue={formState.data.quantity}
          // required
        />
        <div>
          {formState.errors?.quantity && (
            <small className="text-red-500">
              {formState.errors.quantity[0]}
            </small>
          )}
        </div>
      </div>

      {(unit === "piece" || unit === "package") && (
        <div className="mb-3">
          <label
            htmlFor="gramsPerUnit"
            className="block text-gray-700 font-bold mb-1.5"
          >
            Grams per {capitalize(unit)}
          </label>
          <input
            type="number"
            id="gramsPerUnit"
            name="gramsPerUnit"
            className="border rounded py-1 px-2"
            // min={1}
            step={1}
            defaultValue={formState.data.gramsPerUnit}
            // required
          />
          <div>
            {formState.errors?.gramsPerUnit && (
              <small className="text-red-500">
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
          // required
        />
        <div>
          {formState.errors?.expirationDate && (
            <small className="text-red-500">
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
          // required
        >
          <option value="pantry">Pantry</option>
          <option value="fridge">Fridge</option>
          <option value="freezer">Freezer</option>
        </select>
        <div>
          {formState.errors?.storage && (
            <small className="text-red-500">
              {formState.errors.storage[0]}
            </small>
          )}
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-center gap-3">
          <div>
            <input
              type="radio"
              id="closed"
              name="isOpen"
              value="false"
              defaultChecked={formState.data.isOpen === "false"}
            />
            <label htmlFor="closed" className="ml-1">
              Closed
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="open"
              name="isOpen"
              value="true"
              defaultChecked={formState.data.isOpen === "true"}
            />
            <label htmlFor="open" className="ml-1">
              Open
            </label>
          </div>
        </div>
        <div>
          {formState.errors?.isOpen && (
            <small className="text-red-500">{formState.errors.isOpen[0]}</small>
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

        <SubmitButton className="bg-blue-500 hover:bg-blue-600 text-white font-bold cursor-pointer py-2 px-4 rounded-full focus:shadow-outline">
          Add Food
        </SubmitButton>
      </div>
    </form>
  );
};

export default FoodAddForm;
