const express = require("express");
const {
  addExpense,
<<<<<<< HEAD
  getAllExpenses,
  deleteExpense,
  downloadExpenseExcel,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpenses);
router.get("/downloadexcel", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);


=======
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel // ❌ Fix: No space in function name
} = require("../controllers/expenseController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router(); // ❌ Fix: was written incorrectly

// Routes
router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
  router.get("/downloadexcel", protect, downloadExpenseExcel); // ❌ Fix: no space in function name
router.delete("/:id", protect, deleteExpense);

>>>>>>> 96bf417c43b445d7e9846fa4077355731c8ac36e
module.exports = router;
