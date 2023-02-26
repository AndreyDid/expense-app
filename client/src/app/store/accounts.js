import { createAction, createSlice } from "@reduxjs/toolkit";
import accountsService from "../services/accounts.service";
import history from "../utils/history";

const accountsSlice = createSlice({
    name: "accounts",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        accountsRequested: (state) => {
            state.isLoading = true;
        },
        accountsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        accountsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        accountCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        accountUpdate: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
            ] = action.payload;
        },
        accountRemove: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const { reducer: accountsReducer, actions } = accountsSlice;
const {
    accountsRequested,
    accountsReceived,
    accountsRequestFailed,
    accountCreated,
    accountRemove,
    accountUpdate
} = actions;

const accountCreateRequested = createAction("accounts/accountCreateRequested");
const accountRemoveRequested = createAction("accounts/accountRemoveRequested");
const accountUpdateRequested = createAction("accounts/accountUpdateRequested");
const accountUpdateFailed = createAction("accounts/accountUpdateFailed");

export const getAccount = () => (state) => state.accounts.entities;
export const getAccountLoadingStatus = () => (state) =>
    state.accounts.isLoading;

export const loadAccountList = (userId) => async (dispatch) => {
    dispatch(accountsRequested());
    try {
        const { content } = await accountsService.getAccount(userId);
        dispatch(accountsReceived(content));
    } catch (error) {
        dispatch(accountsRequestFailed(error.message));
    }
};
export const removeAccount = (accountId) => async (dispatch) => {
    dispatch(accountRemoveRequested());
    try {
        const { content } = await accountsService.removeAccount(accountId);
        if (!content) {
            dispatch(accountRemove(accountId));
        }
    } catch (error) {
        dispatch(accountsRequestFailed(error.message));
    }
};

export const createAccount = (payload) => async (dispatch) => {
    dispatch(accountCreateRequested());
    try {
        const { content } = await accountsService.createAccount(payload);
        dispatch(accountCreated(content));
        history.push("/");
    } catch (error) {
        dispatch(accountsRequestFailed(error.message));
    }
};

export const updateAccount = (payload) => async (dispatch) => {
    dispatch(accountUpdateRequested());
    try {
        const { content } = await accountsService.update(payload);
        dispatch(accountUpdate(content));
    } catch (error) {
        dispatch(accountUpdateFailed(error.message));
    }
};

export const getAccountById = (id) => (state) => {
    if (state.accounts.entities) {
        return state.accounts.entities.find((a) => a._id === id);
    }
};

export default accountsReducer;
