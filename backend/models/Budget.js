const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  // Assuming you have a User model
      required: true,
    },
    totalBudget: {
      type: Number,
      required: true,
    },
    categories: [
      {
        category: { type: String, required: true },
        limit: { type: Number, required: true },
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
