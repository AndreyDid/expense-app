import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./user";
import incomesReducer from "./incomes";
import expensesReducer from "./expenses";
import accountsReducer from "./accounts";
import categoryExpensesReducer from "./categoryExpense";
import categoryAccountsReducer from "./categoryAccount";

const rootReducer = combineReducers({
    users: usersReducer,
    incomes: incomesReducer,
    expenses: expensesReducer,
    accounts: accountsReducer,
    categoryExpenses: categoryExpensesReducer,
    categoryAccounts: categoryAccountsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
