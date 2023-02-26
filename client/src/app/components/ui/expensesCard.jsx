import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/user";
import {
    getExpenses,
    getExpensesLoadingStatus,
    loadExpensesList
} from "../../store/expenses";
import CardOperation from "../common/cardOperation";
import { orderBy } from "lodash";

const ExpensesCard = () => {
    const userId = useSelector(getCurrentUserId());
    const expenses = useSelector(getExpenses());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadExpensesList(userId));
    }, [userId]);

    const isLoading = useSelector(getExpensesLoadingStatus());

    const sortedExpenses = orderBy(expenses, ["created_at"], ["desc"]);

    if (!isLoading) {
        const allExpenses = expenses.map((b) => b.sum);
        const sumOfExpenses = allExpenses.reduce((acc, curr) => {
            return acc + curr;
        }, 0);
        return (
            <CardOperation
                label="Расход"
                color="text-danger"
                sumOperation={sumOfExpenses}
                operationArray={sortedExpenses}
                userId={userId}
                labelButton="Добавить расход"
                link="createExpenses"
            />
        );
    } else return "Loading...";
};

export default ExpensesCard;
