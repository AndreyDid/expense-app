import React from "react";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { getExpensesLoadingStatus } from "../../store/expenses";
import CardOperation from "../common/cardOperation";
import Loader from "../common/loader";
import PropTypes from "prop-types";

const ExpensesCard = ({ expenses, userId }) => {
    const isLoading = useSelector(getExpensesLoadingStatus());
    const sortedExpenses = orderBy(expenses, ["created_at"], ["desc"]);
    if (!isLoading && expenses) {
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
    } else return <Loader />;
};
ExpensesCard.propTypes = {
    expenses: PropTypes.array,
    userId: PropTypes.string
};

export default ExpensesCard;
