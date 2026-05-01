"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import addFood from "@/app/actions/addFood";
import SubmitButton from "./SubmitButton";
import { capitalize } from "@/lib/utils/utilities";

const FoodAddForm = () => {
  const [unit, setUnit] = useState("piece");

  const router = useRouter();

  return (
    <form action={addFood} className="text-center">
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
          required
        />
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
          required
        >
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
          <option value="dairy">Dairy</option>
          <option value="grains">Grains</option>
          <option value="meat">Meat</option>
          <option value="other">Other</option>
        </select>
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
        />
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
          required
        >
          <option value="piece">Piece</option>
          <option value="package">Package</option>
          <option value="g">g</option>
          <option value="ml">ml</option>
        </select>
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
          min={unit === "piece" || unit === "package" ? 0.25 : 1}
          step={unit === "piece" || unit === "package" ? 0.25 : 1}
          required
        />
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
            min={1}
            step={1}
            required
          />
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
          required
        />
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
          required
        >
          <option value="pantry">Pantry</option>
          <option value="fridge">Fridge</option>
          <option value="freezer">Freezer</option>
        </select>
      </div>

      <div className="mb-3 flex justify-center gap-3">
        <div>
          <input
            type="radio"
            id="closed"
            name="isOpen"
            value="false"
            defaultChecked
          />
          <label htmlFor="closed" className="ml-1">
            Closed
          </label>
        </div>
        <div>
          <input type="radio" id="open" name="isOpen" value="true" />
          <label htmlFor="open" className="ml-1">
            Open
          </label>
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
