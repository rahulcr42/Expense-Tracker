const Budget = require("../models/Budget");
const xlsx = require("xlsx");

// Add Budget
exports.addBudget = async (req, res) => {
  try {
    const { totalBudget, categories, startDate, endDate } = req.body;
    if (!totalBudget || !categories || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBudget = new Budget({
      userId: req.user.id,
      totalBudget,
      categories,
      startDate,
      endDate,
    });

    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Budgets
exports.getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Budget
exports.updateBudget = async (req, res) => {
  try {
    const updatedBudget = await Budget.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.json(updatedBudget);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Budget
exports.deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findByIdAndDelete(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Download Budget Excel
exports.downloadBudgetExcel = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id });

    // Prepare data for Excel
    const data = budgets.map((item) => ({
      TotalBudget: item.totalBudget,
      Categories: item.categories.map((cat) => cat.category).join(", "),
      StartDate: item.startDate,
      EndDate: item.endDate,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Budgets");
    xlsx.writeFile(wb, 'budget_details.xlsx');
    res.download('budget_details.xlsx');
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
