import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/user";
import {
    getIncomes,
    getIncomesLoadingStatus,
    loadIncomesList
} from "../../store/incomes";
import CardOperation from "../common/cardOperation";
import { orderBy } from "lodash";

const IncomesCard = () => {
    const userId = useSelector(getCurrentUserId());
    const incomes = useSelector(getIncomes());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadIncomesList(userId));
    }, [userId]);

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
    } else return "Loading...";
};

export default IncomesCard;
