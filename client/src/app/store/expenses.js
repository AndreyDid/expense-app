import { createAction, createSlice } from "@reduxjs/toolkit";
import expensesService from "../services/expenses.service";
import history from "../utils/history";

const expensesSlice = createSlice({
    name: "expenses",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        expensesRequested: (state) => {
            state.isLoading = true;
        },
        expensesReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        expensesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        expenseCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        expenseUpdate: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
            ] = action.payload;
        },
        expenseRemove: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const { reducer: expensesReducer, actions } = expensesSlice;
const {
    expensesRequested,
    expensesReceived,
    expensesRequestFailed,
    expenseCreated,
    expenseRemove,
    expenseUpdate
} = actions;

const expenseCreateRequested = createAction("expenses/expenseCreateRequested");
const expenseRemoveRequested = createAction("expenses/expenseRemoveRequested");
const expenseUpdateRequested = createAction("expenses/expenseUpdateRequested");
const expenseUpdateFailed = createAction("expenses/expenseUpdateFailed");

export const getExpenses = () => (state) => state.expenses.entities;
export const getExpensesLoadingStatus = () => (state) =>
    state.expenses.isLoading;

export const loadExpensesList = (userId) => async (dispatch) => {
    dispatch(expensesRequested());
    try {
        const { content } = await expensesService.getExpenses(userId);
        dispatch(expensesReceived(content));
    } catch (error) {
        dispatch(expensesRequestFailed(error.message));
    }
};

export const removeExpense = (expenseId) => async (dispatch) => {
    dispatch(expenseRemoveRequested());
    try {
        const { content } = await expensesService.removeExpenses(expenseId);
        if (!content) {
            dispatch(expenseRemove(expenseId));
        }
    } catch (error) {
        dispatch(expensesRequestFailed(error.message));
    }
};

export const createExpenses = (payload) => async (dispatch) => {
    dispatch(expenseCreateRequested());
    try {
        const { content } = await expensesService.createExpense(payload);
        dispatch(expenseCreated(content));
        history.push("/");
    } catch (error) {
        dispatch(expensesRequestFailed(error.message));
    }
};

export const updateExpense = (payload) => async (dispatch) => {
    dispatch(expenseUpdateRequested());
    try {
        const { content } = await expensesService.update(payload);
        dispatch(expenseUpdate(content));
        history.push(`/user/historyOperations`);
    } catch (error) {
        dispatch(expenseUpdateFailed(error.message));
    }
};

export default expensesReducer;
