import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  const savedState = localStorage.getItem('budgetState');
  return savedState ? JSON.parse(savedState) : { totalIncome: 0, totalExpenses: 0, transactions: [] };
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState: loadState(),
  reducers: {
    addIncome: (state, action) => {
      state.totalIncome += action.payload.amount;
      state.transactions.push({ type: 'Income', amount: action.payload.amount, description: action.payload.description });
      saveState(state);
    },
    addExpense: (state, action) => {
      state.totalExpenses += action.payload.amount;
      state.transactions.push({ type: 'Expense', amount: action.payload.amount, description: action.payload.description });
      saveState(state);
    },
    reset: (state) => {
      state.totalIncome = 0;
      state.totalExpenses = 0;
      state.transactions = [];
      saveState(state);
    },
  },
});

const saveState = (state) => {
  localStorage.setItem('budgetState', JSON.stringify(state));
};

export const { addIncome, addExpense, reset } = budgetSlice.actions;
export default budgetSlice.reducer;
