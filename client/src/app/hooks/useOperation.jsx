import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../store/user";
import { getAccount, loadAccountList } from "../store/accounts";
import { getExpenses, loadExpensesList } from "../store/expenses";
import { getIncomes, loadIncomesList } from "../store/incomes";
import { useParams } from "react-router-dom";
import {
    getCategoryExpenses,
    loadCategoryExpensesList
} from "../store/categoryExpense";
import {
    getCategoryAccount,
    loadCategoryAccountList
} from "../store/categoryAccount";
import history from "../utils/history";

const useOperation = () => {
    const userId = useSelector(getCurrentUserId());
    const account = useSelector(getAccount());
    const expenses = useSelector(getExpenses());
    const incomes = useSelector(getIncomes());
    const dispatch = useDispatch();
    const params = useParams();

    const catExpenses = useSelector(getCategoryExpenses());
    const catAccount = useSelector(getCategoryAccount());

    let allOperations = [];
    if (incomes && expenses) {
        allOperations = [...incomes, ...expenses];
    }

    useEffect(() => {
        dispatch(loadCategoryAccountList(userId));
    }, [userId]);

    useEffect(() => {
        dispatch(loadCategoryExpensesList(userId));
    }, [userId]);

    useEffect(() => {
        dispatch(loadIncomesList(userId));
    }, [userId]);

    useEffect(() => {
        dispatch(loadAccountList(userId));
    }, [userId]);

    useEffect(() => {
        dispatch(loadExpensesList(userId));
    }, [userId]);

    const handleClick = useCallback((accountId) => {
        history.push(`/user/account/${accountId}/edit`);
    }, []);

    return {
        account,
        expenses,
        incomes,
        userId,
        dispatch,
        params,
        allOperations,
        handleClick,
        catAccount,
        catExpenses
    };
};

export default useOperation;
