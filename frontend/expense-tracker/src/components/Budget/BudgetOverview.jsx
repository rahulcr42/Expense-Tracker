import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomLineChart from "../Charts/CustomLineChart";
import { prepareBudgetLineChartData } from "../../utils/helper"; // Ensure this helper is correct for budgeting

const BudgetOverview = ({ budgets, onAddBudget }) => {
  const data = [
    { month: "Jan", budget: 1200, expenses: 800 },
    { month: "Feb", budget: 1500, expenses: 900 },
    { month: "Mar", budget: 1800, expenses: 1200 },
    { month: "Apr", budget: 1100, expenses: 1000 },
    { month: "May", budget: 2000, expenses: 1500 },
    { month: "Jun", budget: 1700, expenses: 1400 },
    { month: "Jul", budget: 1900, expenses: 1600 },
    { month: "Aug", budget: 2100, expenses: 1700 },
    { month: "Sep", budget: 1600, expenses: 1300 },
    { month: "Oct", budget: 2300, expenses: 1800 },
    { month: "Nov", budget: 2500, expenses: 2000 },
    { month: "Dec", budget: 2700, expenses: 2200 },
  ];

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareBudgetLineChartData(budgets); // Use the budget-specific helper
    setChartData(result);
    return () => {};
  }, [budgets]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Budget Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your income and spending trends over time.
          </p>
        </div>
        <button className="add-btn" onClick={onAddBudget}>
          <LuPlus className="text-lg" />
          Add Budget
        </button>
      </div>
      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default BudgetOverview;
