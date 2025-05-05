import React, { useState } from "react";

const AddBudgetForm = ({ onAddBudget }) => {
  const [totalBudget, setTotalBudget] = useState("");
  const [categories, setCategories] = useState([{ category: "", limit: "" }]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCategoryChange = (index, e) => {
    const newCategories = [...categories];
    newCategories[index][e.target.name] = e.target.value;
    setCategories(newCategories);
  };

  const handleAddCategory = () => {
    setCategories([...categories, { category: "", limit: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const budget = {
      totalBudget,
      categories,
      startDate,
      endDate,
    };
    onAddBudget(budget);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label>Total Budget</label>
        <input
          type="number"
          value={totalBudget}
          onChange={(e) => setTotalBudget(e.target.value)}
          className="w-full border rounded-lg p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label>Categories</label>
        {categories.map((category, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              name="category"
              value={category.category}
              onChange={(e) => handleCategoryChange(index, e)}
              placeholder="Category"
              className="w-1/2 border rounded-lg p-2"
              required
            />
            <input
              type="number"
              name="limit"
              value={category.limit}
              onChange={(e) => handleCategoryChange(index, e)}
              placeholder="Limit"
              className="w-1/2 border rounded-lg p-2"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddCategory}
          className="text-blue-600 hover:text-blue-800"
        >
          Add Category
        </button>
      </div>

      <div className="mb-4">
        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border rounded-lg p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full border rounded-lg p-2"
          required
        />
      </div>

      <button type="submit" className="add-btn">
        Add Budget
      </button>
    </form>
  );
};

export default AddBudgetForm;
