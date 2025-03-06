import mongoose, { mongo } from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["card", "cash"],
    // enum: ["credit card", "Bank Transfer", "debit card", "card", "Direct Deposit", "wallet transfer"],
    required: true,
  },

  // type: {
  //   type: String,
  //   enum: ["all", "income", "expense", "investment"],
  //   required: true,
  // },
  category: {
    type: String,
    enum: ["saving", "expense", "investment"],
    // enum: [
    //   "groceries",
    //   "shopping",
    //   "health & fitness",
    //   "entertainment",
    //   "transportation",
    //   "utilities",
    // ],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: [0, "Amount cannot be negative"], // Ensure positive amounts
  },
  location: {
    type: String,
    default: "Unknown",
  },
  date: {
    type: Date,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
