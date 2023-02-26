import { createSlice } from "@reduxjs/toolkit";
import categoryExpensesService from "../services/categoryExpense.service";

const categoryExpensesSlice = createSlice({
    name: "categoryExpenses",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        categoryExpensesRequested: (state) => {
            state.isLoading = true;
        },
        categoryExpensesReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        categoryExpensesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: categoryExpensesReducer, actions } = categoryExpensesSlice;
const {
    categoryExpensesRequested,
    categoryExpensesReceived,
    categoryExpensesRequestFailed
} = actions;

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadCategoryExpensesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().categoryExpenses;
    if (isOutdated(lastFetch)) {
        dispatch(categoryExpensesRequested());
        try {
            const { content } = await categoryExpensesService.get();
            dispatch(categoryExpensesReceived(content));
        } catch (error) {
            dispatch(categoryExpensesRequestFailed(error.message));
        }
    }
};

export const getCategoryExpenses = () => (state) =>
    state.categoryExpenses.entities;
export const getCategoryExpensesLoadingStatus = () => (state) =>
    state.categoryExpenses.isLoading;

export const getCategoryExpenseById = (id) => (state) => {
    if (state.categoryExpenses.entities) {
        return state.categoryExpenses.entities.find((e) => e._id === id);
    }
};

export default categoryExpensesReducer;
