import { createAction, createSlice } from "@reduxjs/toolkit";
import categoryAccountsService from "../services/categoryAccount.service";

const categoryAccountsSlice = createSlice({
    name: "categoryAccount",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        categoryAccountsRequested: (state) => {
            state.isLoading = true;
        },
        categoryAccountsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        categoryAccountsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        categoryAccountCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        categoryAccountUpdate: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
            ] = action.payload;
        },
        categoryAccountRemove: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const { reducer: categoryAccountsReducer, actions } = categoryAccountsSlice;
const {
    categoryAccountsRequested,
    categoryAccountsReceived,
    categoryAccountsRequestFailed,
    categoryAccountCreated,
    categoryAccountRemove
} = actions;

const categoryAccountCreateRequested = createAction(
    "categoryAccounts/categoryAccountCreateRequested"
);
const categoryAccountRemoveRequested = createAction(
    "categoryAccounts/categoryAccountRemoveRequested"
);

export const getCategoryAccount = () => (state) =>
    state.categoryAccounts.entities;

export const getCategoryAccountLoadingStatus = () => (state) =>
    state.categoryAccounts.isLoading;

export const loadCategoryAccountList = (userId) => async (dispatch) => {
    dispatch(categoryAccountsRequested());
    try {
        const { content } = await categoryAccountsService.getCategoryAccount(
            userId
        );
        dispatch(categoryAccountsReceived(content));
    } catch (error) {
        dispatch(categoryAccountsRequestFailed(error.message));
    }
};
export const removeCategoryAccount =
    (categoryCategoryAccountId) => async (dispatch) => {
        dispatch(categoryAccountRemoveRequested());
        try {
            const { content } =
                await categoryAccountsService.removeCategoryAccount(
                    categoryCategoryAccountId
                );
            if (!content) {
                dispatch(categoryAccountRemove(categoryCategoryAccountId));
            }
        } catch (error) {
            dispatch(categoryAccountsRequestFailed(error.message));
        }
    };

export const createCategoryAccount = (payload) => async (dispatch) => {
    dispatch(categoryAccountCreateRequested());
    try {
        const { content } = await categoryAccountsService.createCategoryAccount(
            payload
        );
        dispatch(categoryAccountCreated(content));
    } catch (error) {
        dispatch(categoryAccountsRequestFailed(error.message));
    }
};

export const getCategoryAccountById = (id) => (state) => {
    if (state.categoryAccounts.entities) {
        return state.categoryAccounts.entities.find((a) => a._id === id);
    }
};

export default categoryAccountsReducer;
