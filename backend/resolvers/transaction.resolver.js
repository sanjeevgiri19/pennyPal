import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

const transactionResolver = {
  Query: {
    // context: Provides authentication-related utilities.
    // Qurey =>  (parent, {arguments}, context)
    transactions: async (_, {}, context) => {
      try {
        // if (!context.getUser()) throw new Error("Unauthorized");
        const user = context.getUser();
        if (!user) throw new Error("Unauthorized");

        // const userId = await context.getUser()._id; //context.getUser():  authenticated user lai fetch garxa from request context.
        // const transactions = await Transaction.find({ userId });

        const transactions = await Transaction.find({
          userId: user._id,
        });

        return transactions;
      } catch (error) {
        console.error("Error getting transactions:", error);
        throw new Error("Error getting transactions");
      }
    },

    //  Fetch a single transaction, ensuring it belongs to the user
    transaction: async (_, { transactionId }, context) => {
      try {
        // const transaction = await Transaction.findById({ transactionId });

        const user = context.getUser();
        if (!user) throw new Error("Unauthorized");

        const transaction = await Transaction.findOne({
          _id: transactionId,
          userId: user._id,
        });
        if (!transaction) throw new Error("Transaction not found");
        return transaction;
      } catch (error) {
        console.error("Error getting transaction:", error);
        throw new Error("Error getting transaction");
      }
    },

    categoryStatistics: async (_, {}, context) => {
      if (!context.getUser()) throw new Error("Unauthorized");

      const userId = context.getUser()._id;
      const transactions = await Transaction.find({ userId });
      const categoryMap = {};

      //Example usecase: 
      // const transactions = [
      // 	{ category: "expense", amount: 50 },
      // 	{ category: "expense", amount: 75 },
      // 	{ category: "investment", amount: 100 },
      // 	{ category: "saving", amount: 30 },
      // 	{ category: "saving", amount: 20 }
      // ];

      // console.log("trandsactions", transactions);
      
      transactions.forEach((transaction) => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0;
        }
        categoryMap[transaction.category] += transaction.amount;
      });

      // categoryMap = { expense: 125, investment: 100, saving: 50 }
// console.log("category map", categoryMap);

      return Object.entries(categoryMap).map(([category, totalAmount]) => ({
        category,
        totalAmount,
      }));
      // return [ { category: "expense", totalAmount: 125 }, { category: "investment", totalAmount: 100 }, { category: "saving", totalAmount: 50 } ]
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const user = context.getUser();
        if (!user) throw new Error("Unauthorized");
        const newTransaction = new Transaction({
          ...input,
          userId: user._id, 
        });
        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.error("Error creating transaction:", error);
        throw new Error("Error creating transaction");
      }
    },

    //  Update an existing transaction only if it belongs to the user
    updateTransaction: async (_, { input }, context) => {
      try {
        const user = context.getUser();
        if (!user) throw new Error("Unauthorized");

        const updatedTransaction = await Transaction.findOneAndUpdate(
          { _id: input.transactionId, userId: user._id }, 
          // input.transactionId, // Extracts the transactionId from the input object to find the specific transaction to update.
          input, // The new data to update the transaction with
          { new: true } //Ensures that the function returns the updated transaction instead of the old one.
        );
        if (!updatedTransaction)
          throw new Error("Transaction not found or unauthorized");

        return updatedTransaction;
      } catch (error) {
        console.error("Error updating transaction:", error);
        throw new Error("Error updating transaction");
      }
    },

    deleteTransaction: async (_, { transactionId }, context) => {
      try {
        // const deletedTransaction = await Transaction.findByIdAndDelete( transactionId );
        const user = context.getUser();
        if (!user) throw new Error("Unauthorized");

        const deletedTransaction = await Transaction.findOneAndDelete({
          _id: transactionId,
          userId: user._id,
        });
        if (!deletedTransaction)
          throw new Error("Transaction not found or unauthorized");
        return deletedTransaction;
      } catch (error) {
        console.error("Error deleting transaction:", error);
        throw new Error("Error deleting transaction");
      }
    },
  },
  Transaction: {
    user: async (parent) => {
      // const userId = parent.userId;
      try {
        const user = await User.findById(parent.userId);
        if (!user) throw new Error("User not found");
        return user;
      } catch (error) {
        console.log("Error getting user");
        throw new Error('Error Getting User');
      }
    },
  },
};
export default transactionResolver;
