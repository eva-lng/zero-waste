const FoodItemCard = () => {
  return (
    <div className="flex justify-between border border-gray-500 rounded p-2">
      <div className="flex flex-col">
        <h3>item name</h3>
        <span>quantity</span>
        <span>expiration date</span>
      </div>
      <div className="flex flex-col justify-between">
        <span>storage</span>
        <span>category</span>
      </div>
    </div>
  );
};

export default FoodItemCard;
