import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/user";
import { getIncomesLoadingStatus } from "../../store/incomes";
import CardOperation from "../common/cardOperation";
import history from "../../utils/history";

import {
    getAccount,
    getAccountLoadingStatus,
    loadAccountList
} from "../../store/accounts";

const AccountsCard = () => {
    const userId = useSelector(getCurrentUserId());
    const account = useSelector(getAccount(userId));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAccountList(userId));
    }, [userId]);

    const isLoading = useSelector(getIncomesLoadingStatus());

    const isLoadingAcc = useSelector(getAccountLoadingStatus());

    const handleClick = (accountId) => {
        history.push(`/user/account/${accountId}/edit`);
    };

    if (!isLoading && !isLoadingAcc) {
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
    } else return "Loading...";
};

export default AccountsCard;
