import React from "react";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { getExpensesLoadingStatus } from "../../store/expenses";
import CardOperation from "../common/cardOperation";
import Loader from "../common/loader";
import useOperation from "../../hooks/useOperation";

const ExpensesCard = () => {
    const { expenses, userId } = useOperation();

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
    } else return <Loader/>;
};

export default ExpensesCard;
