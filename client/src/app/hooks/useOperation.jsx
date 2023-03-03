import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../store/user";
import { getAccount, loadAccountList } from "../store/accounts";
import { getExpenses, loadExpensesList } from "../store/expenses";
import { getIncomes, loadIncomesList } from "../store/incomes";
import { useParams } from "react-router-dom";
import history from "../utils/history";

const useOperation = () => {
    const userId = useSelector(getCurrentUserId());
    const account = useSelector(getAccount());
    const expenses = useSelector(getExpenses());
    const incomes = useSelector(getIncomes());
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(loadIncomesList(userId));
    }, [userId]);

    useEffect(() => {
        dispatch(loadAccountList(userId));
    }, [userId]);

    useEffect(() => {
        dispatch(loadExpensesList(userId));
    }, [userId]);

    const handleClick = (accountId) => {
        history.push(`/user/account/${accountId}/edit`);
    };

    return {
        account,
        expenses,
        incomes,
        userId,
        dispatch,
        params,
        handleClick
    };
};

export default useOperation;
