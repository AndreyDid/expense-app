import React from "react";
import PropTypes from "prop-types";
import CardOperation from "../common/cardOperation";
import Loader from "../common/loader";
import { useSelector } from "react-redux";
import { getIncomesLoadingStatus } from "../../store/incomes";
import { getAccountLoadingStatus } from "../../store/accounts";
import { sumBalance } from "../../utils/sumBalance";

const AccountsCard = ({ account, handleClick, userId }) => {
    const isLoadingIncome = useSelector(getIncomesLoadingStatus());
    const isLoadingAccount = useSelector(getAccountLoadingStatus());
    if (!isLoadingIncome && !isLoadingAccount && account) {
        const allAccounts = account.map((b) => b.sum);
        const sumOfBalance = sumBalance(allAccounts);

        return (
            <CardOperation
                label="Счет"
                color="text-body"
                sumOperation={sumOfBalance}
                operationArray={account}
                userId={userId}
                link="createAccount"
                labelButton="Создать счет"
                handleClick={handleClick}
            />
        );
    } else return <Loader />;
};
AccountsCard.propTypes = {
    account: PropTypes.array,
    handleClick: PropTypes.func,
    userId: PropTypes.string
};

export default AccountsCard;
