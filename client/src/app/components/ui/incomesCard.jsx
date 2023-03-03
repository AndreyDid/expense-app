import React from "react";
import { useSelector } from "react-redux";
import { orderBy } from "lodash";
import { getIncomesLoadingStatus } from "../../store/incomes";
import CardOperation from "../common/cardOperation";
import Loader from "../common/loader";
import useOperation from "../../hooks/useOperation";

const IncomesCard = () => {
    const { incomes, userId } = useOperation();

    const isLoading = useSelector(getIncomesLoadingStatus());

    const sortedIncomes = orderBy(incomes, ["created_at"], ["desc"]);
    if (!isLoading) {
        const allIncomes = incomes.map((b) => b.sum);
        const sumOfBalance = allIncomes.reduce((acc, curr) => {
            return acc + curr;
        }, 0);
        return (
            <CardOperation
                label="Доход"
                color="text-success"
                sumOperation={sumOfBalance}
                operationArray={sortedIncomes}
                userId={userId}
                labelButton="Добавить доход"
                link="createIncome"
            />
        );
    } else return <Loader/>;
};

export default IncomesCard;
