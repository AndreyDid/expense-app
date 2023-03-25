import React from "react";
import { useSelector } from "react-redux";
import { orderBy } from "lodash";
import { getIncomesLoadingStatus } from "../../store/incomes";
import { sumBalance } from "../../utils/sumBalance";
import CardOperation from "../common/cardOperation";
import Loader from "../common/loader";
import PropTypes from "prop-types";

const IncomesCard = ({ incomes, userId }) => {
    const isLoading = useSelector(getIncomesLoadingStatus());
    const sortedIncomes = orderBy(incomes, ["created_at"], ["desc"]);
    if (!isLoading && incomes) {
        const allIncomes = incomes.map((b) => b.sum);
        const sumOfBalance = sumBalance(allIncomes);
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
    } else return <Loader />;
};
IncomesCard.propTypes = {
    incomes: PropTypes.array,
    userId: PropTypes.string
};

export default IncomesCard;
