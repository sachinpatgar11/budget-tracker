import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import BudgetTracker from "./BudgetTracker";
import "./App.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
          <BudgetTracker />
        </div>
      </Provider>
    </>
  );
}

export default App;
