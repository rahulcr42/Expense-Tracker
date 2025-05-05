import React from "react";

const BudgetList = ({ budgets, onDelete, onDownload }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Your Budgets</h3>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Total Budget</th>
            <th className="px-4 py-2">Categories</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">End Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget) => (
            <tr key={budget._id}>
              <td className="px-4 py-2">{budget.totalBudget}</td>
              <td className="px-4 py-2">
                {budget.categories.map((category) => category.category).join(", ")}
              </td>
              <td className="px-4 py-2">{new Date(budget.startDate).toLocaleDateString()}</td>
              <td className="px-4 py-2">{new Date(budget.endDate).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onDelete(budget._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={onDownload}
        className="mt-4 py-2 px-4 bg-gray-500 text-white rounded-lg"
      >
        Download Budget Details
      </button>
    </div>
  );
};

export default BudgetList;
