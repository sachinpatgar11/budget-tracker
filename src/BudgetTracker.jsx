import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIncome, addExpense, reset } from "./store/budgetSlice";
import ThemeSwitcher from "./ThemeSwitcher"; // Import the ThemeSwitcher component

const BudgetTracker = () => {
  const [incomeInput, setIncomeInput] = useState("");
  const [incomeDescription, setIncomeDescription] = useState("");
  const [expenseInput, setExpenseInput] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const dispatch = useDispatch();
  const { totalIncome, totalExpenses, transactions } = useSelector(
    (state) => state.budget
  );

  const handleAddIncome = () => {
    if (incomeInput && incomeDescription) {
      dispatch(
        addIncome({
          amount: Number(incomeInput),
          description: incomeDescription,
        })
      );
      setIncomeInput("");
      setIncomeDescription("");
    }
  };

  const handleAddExpense = () => {
    if (expenseInput && expenseDescription) {
      dispatch(
        addExpense({
          amount: Number(expenseInput),
          description: expenseDescription,
        })
      );
      setExpenseInput("");
      setExpenseDescription("");
    }
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const remainingMoney = totalIncome - totalExpenses;

  return (
    <div className="p-6 sm:p-8 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <ThemeSwitcher /> {/* Add ThemeSwitcher here */}
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
        Budget Tracker
      </h1>
      <div className="text-center mb-4">
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Reset All Data
        </button>
      </div>
      <h2 className="text-xl mb-2 text-center text-gray-900 dark:text-gray-100">
        Total: ${totalIncome - totalExpenses}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-green-100 dark:bg-green-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Total Income: ${totalIncome}</h2>
          <input
            type="number"
            value={incomeInput}
            onChange={(e) => setIncomeInput(e.target.value)}
            className="border p-2 rounded mt-2 w-full"
            placeholder="Add Income"
          />
          <input
            type="text"
            value={incomeDescription}
            onChange={(e) => setIncomeDescription(e.target.value)}
            className="border p-2 rounded mt-2 w-full"
            placeholder="Income Description"
          />
          <button
            onClick={handleAddIncome}
            className="bg-green-500 text-white p-2 rounded mt-2 w-full"
          >
            Add Income
          </button>
        </div>

        <div className="bg-red-100 dark:bg-red-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">
            Total Expenses: ${totalExpenses}
          </h2>
          <input
            type="number"
            value={expenseInput}
            onChange={(e) => setExpenseInput(e.target.value)}
            className="border p-2 rounded mt-2 w-full"
            placeholder="Add Expense"
          />
          <input
            type="text"
            value={expenseDescription}
            onChange={(e) => setExpenseDescription(e.target.value)}
            className="border p-2 rounded mt-2 w-full"
            placeholder="Expense Description"
          />
          <button
            onClick={handleAddExpense}
            className="bg-red-500 text-white p-2 rounded mt-2 w-full"
          >
            Add Expense
          </button>
        </div>
      </div>
      <h2 className="text-xl text-gray-900 dark:text-gray-100">
        Remaining Money: ${remainingMoney}
      </h2>
      <h2 className="text-xl mt-4 text-gray-900 dark:text-gray-100">
        Transactions:
      </h2>
      <ul className="mt-4">
        {transactions.map((transaction, index) => (
          <li
            key={index}
            className={`flex justify-between ${
              transaction.type === "Income" ? "text-green-600" : "text-red-600"
            }`}
          >
            {transaction.type}: ${transaction.amount}{" "}
            {transaction.description && `(${transaction.description})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetTracker;
