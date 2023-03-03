import React from "react";
import CardOperation from "../common/cardOperation";
import Loader from "../common/loader";
import useOperation from "../../hooks/useOperation";
import { useSelector } from "react-redux";
import { getIncomesLoadingStatus } from "../../store/incomes";
import { getAccountLoadingStatus } from "../../store/accounts";

const AccountsCard = () => {
    const { account, handleClick, userId } = useOperation();

    const isLoadingIncome = useSelector(getIncomesLoadingStatus());
    const isLoadingAccount = useSelector(getAccountLoadingStatus());

    if (!isLoadingIncome && !isLoadingAccount) {
        const allAccounts = account.map((b) => b.sum);
        const sumOfBalance = allAccounts.reduce((acc, curr) => {
            return acc + Number(curr);
        }, 0);

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

export default AccountsCard;
