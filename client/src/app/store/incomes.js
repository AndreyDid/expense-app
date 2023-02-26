import { createAction, createSlice } from "@reduxjs/toolkit";
import incomesService from "../services/incomes.service";
import history from "../utils/history";

const incomesSlice = createSlice({
    name: "incomes",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        incomesRequested: (state) => {
            state.isLoading = true;
        },
        incomesReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        incomesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        incomeCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        incomeUpdate: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
            ] = action.payload;
        },
        incomeRemove: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const { reducer: incomesReducer, actions } = incomesSlice;
const {
    incomesRequested,
    incomesReceived,
    incomesRequestFailed,
    incomeCreated,
    incomeRemove,
    incomeUpdate
} = actions;

const incomeCreateRequested = createAction("incomes/incomeCreateRequested");
const incomeRemoveRequested = createAction("incomes/incomeRemoveRequested");
const incomeUpdateRequested = createAction("incomes/incomeUpdateRequested");
const incomeUpdateFailed = createAction("incomes/incomeUpdateFailed");

export const getIncomes = () => (state) => state.incomes.entities;
export const getIncomesLoadingStatus = () => (state) => state.incomes.isLoading;

export const loadIncomesList = (userId) => async (dispatch) => {
    dispatch(incomesRequested());
    try {
        const { content } = await incomesService.getIncomes(userId);
        dispatch(incomesReceived(content));
    } catch (error) {
        dispatch(incomesRequestFailed(error.message));
    }
};

export const getCurrentIncomeById = (id) => (state) => {
    if (state.incomes.entities) {
        return state.incomes.entities.find((i) => i._id === id);
    }
};

export const removeIncome = (incomeId) => async (dispatch) => {
    dispatch(incomeRemoveRequested());
    try {
        const { content } = await incomesService.removeIncomes(incomeId);
        if (!content) {
            dispatch(incomeRemove(incomeId));
        }
    } catch (error) {
        dispatch(incomesRequestFailed(error.message));
    }
};

export const createIncomes = (payload) => async (dispatch) => {
    dispatch(incomeCreateRequested());
    try {
        const { content } = await incomesService.createIncome(payload);
        dispatch(incomeCreated(content));
        history.push("/");
    } catch (error) {
        dispatch(incomesRequestFailed(error.message));
    }
};

export const updateIncomes = (payload) => async (dispatch) => {
    dispatch(incomeUpdateRequested());
    try {
        const { content } = await incomesService.update(payload);
        dispatch(incomeUpdate(content));
        history.push(`/user/historyOperations`);
    } catch (error) {
        dispatch(incomeUpdateFailed(error.message));
    }
};

export default incomesReducer;
