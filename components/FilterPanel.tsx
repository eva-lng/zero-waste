const FilterPanel = () => {
  return (
    <div className="border rounded-b-lg p-2">
      <section>
        <h3>Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0.5">
          <div>
            <input type="checkbox" id="fruit" />
            <label htmlFor="fruit">Fruit</label>
          </div>
          <div>
            <input type="checkbox" id="vegetables" />
            <label htmlFor="vegetables">Vegetables</label>
          </div>
          <div>
            <input type="checkbox" id="dairy" />
            <label htmlFor="dairy">Dairy</label>
          </div>
          <div>
            <input type="checkbox" id="grains" />
            <label htmlFor="grains">Grains</label>
          </div>
          <div>
            <input type="checkbox" id="meat" />
            <label htmlFor="meat">Meat</label>
          </div>
          <div>
            <input type="checkbox" id="other" />
            <label htmlFor="other">Other</label>
          </div>
        </div>
      </section>
      <section>
        <h3>Storage</h3>
        <div className="grid grid-cols-2 md:grid-cols-3">
          <div>
            <input type="checkbox" id="pantry" />
            <label htmlFor="pantry">Pantry</label>
          </div>
          <div>
            <input type="checkbox" id="fridge" />
            <label htmlFor="fridge">Fridge</label>
          </div>
          <div>
            <input type="checkbox" id="freezer" />
            <label htmlFor="freezer">Freezer</label>
          </div>
        </div>
      </section>
      <section>
        <h3>Expiration</h3>
        <div className="grid grid-cols-2 md:grid-cols-3">
          <div>
            <input type="checkbox" id="fresh" />
            <label htmlFor="fresh">Fresh</label>
          </div>
          <div>
            <input type="checkbox" id="soon" />
            <label htmlFor="soon">Expiring soon</label>
          </div>
          <div>
            <input type="checkbox" id="expired" />
            <label htmlFor="expired">Expired</label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FilterPanel;
