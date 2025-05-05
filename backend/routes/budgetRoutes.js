const express = require("express");
const {
  addBudget,
  getAllBudgets,
  updateBudget,
  deleteBudget,
  downloadBudgetExcel,
} = require("../controllers/budgetController");  // Adjust based on your controller file name
const { protect } = require("../middleware/authMiddleware");  // Adjust the path if necessary

const router = express.Router();

// Routes for Budget management
router.post("/add", protect, addBudget);               // Add new budget
router.get("/get", protect, getAllBudgets);            // Get all budgets
router.put("/update/:id", protect, updateBudget);      // Update existing budget
router.delete("/:id", protect, deleteBudget);          // Delete a budget
router.get("/downloadexcel", protect, downloadBudgetExcel);  // Download budget details in Excel

module.exports = router;
