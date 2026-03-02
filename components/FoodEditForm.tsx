import updateFood from "@/app/actions/updateFood";
import { FoodItemType } from "@/types/food";

const FoodEditForm = ({ foodItem }: { foodItem: FoodItemType }) => {
  const updateFoodById = updateFood.bind(null, foodItem._id.toString());

  console.log(foodItem.expirationDate.toISOString());

  return (
    <>
      <h2>Edit Food</h2>
      <form action={updateFoodById} className="text-center">
        <div className="mb-3">
          <label
            htmlFor="name"
            className="block text-gray-700 font-bold mb-1.5"
          >
            Food Item Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border rounded py-1 px-2"
            placeholder="E.g. apple"
            defaultValue={foodItem.name}
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
            defaultValue={foodItem.category}
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
            defaultValue={foodItem.details}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="unit"
            className="block text-gray-700 font-bold mb-1.5"
          >
            Unit
          </label>
          <select
            name="unit"
            id="unit"
            className="border rounded py-1 px-2"
            defaultValue={foodItem.unit}
            required
          >
            <option value="piece">Piece</option>
            <option value="package">Package</option>
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
            min={1}
            defaultValue={foodItem.quantity}
            required
          />
        </div>

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
            defaultValue={
              new Date(foodItem.expirationDate).toISOString().split("T")[0]
            }
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
            defaultValue={foodItem.storage}
            required
          >
            <option value="pantry">Pantry</option>
            <option value="fridge">Fridge</option>
            <option value="freezer">Freezer</option>
          </select>
        </div>

        <div className="mb-3">
          <label
            htmlFor="status"
            className="block text-gray-700 font-bold mb-1.5"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            className="border rounded py-1 px-2"
            defaultValue={foodItem.status}
            required
          >
            <option value="active">Active</option>
            <option value="consumed">Consumed</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold cursor-pointer py-2 px-4 rounded-full focus:shadow-outline"
          >
            Update Food
          </button>
        </div>
      </form>
    </>
  );
};

export default FoodEditForm;
