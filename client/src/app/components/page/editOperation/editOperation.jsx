import React, { useEffect, useState } from "react";
import TextField from "../../inputs/textField";
import Button from "../../common/button";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/user";
import { useHistory, useParams } from "react-router-dom";
import {
    getExpenses,
    getExpensesLoadingStatus,
    updateExpense
} from "../../../store/expenses";
import {
    getAccount,
    getAccountLoadingStatus,
    loadAccountList,
    updateAccount
} from "../../../store/accounts";
import SelectField from "../../inputs/selectField";
import { getCategoryExpenses } from "../../../store/categoryExpense";
import { getIncomes, updateIncomes } from "../../../store/incomes";
import {
    getCategoryAccount,
    getCategoryAccountLoadingStatus
} from "../../../store/categoryAccount";
import {
    mathUpdateExpense,
    mathUpdateIncome
} from "../../../utils/mathOperations";
import useForm from "../../../hooks/useForm";

const EditOperation = () => {
    const userId = useSelector(getCurrentUserId());
    const history = useHistory();
    const params = useParams();
    const { operationsId } = params;
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(loadAccountList(userId));
    }, [userId]);

    const AllExpenses = useSelector(getExpenses());
    const AllIncomes = useSelector(getIncomes());
    let allOperations = [];
    if (AllIncomes && AllExpenses) {
        allOperations = [...AllIncomes, ...AllExpenses];
    }
    const currentOperation = allOperations.find((i) => i._id === operationsId);

    const categoryExpenses = useSelector(getCategoryExpenses());
    const categoryExpensesLoading = useSelector(getExpensesLoadingStatus());
    const categoryExpensesList = categoryExpenses.map((c) => ({
        label: c.name,
        value: c._id
    }));

    const account = useSelector(getAccount(userId));
    const accountLoading = useSelector(getAccountLoadingStatus());

    const categoryAccount = useSelector(getCategoryAccount());
    const categoryAccountLoading = useSelector(
        getCategoryAccountLoadingStatus()
    );

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        account: {
            isRequired: {
                message: "Это поле обязательно для заполнения"
            }
        },
        category: {
            isRequired: {
                message: "Это поле обязательно для заполнения"
            }
        },
        sum: {
            isRequired: {
                message: "Это поле обязательно для заполнения"
            }
        }
    };

    const { handleChange, isValid, validate, errors, dispatch } = useForm(
        validatorConfig,
        data,
        setData
    );

    useEffect(() => {
        if (
            currentOperation &&
            !data &&
            !categoryExpensesLoading &&
            !accountLoading &&
            !categoryAccountLoading
        ) {
            setData((prevState) => ({ ...currentOperation }));
        }
    }, [
        currentOperation,
        data,
        categoryExpensesLoading,
        accountLoading,
        categoryAccountLoading
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const findAccount = account.filter((a) => a._id === data.account);
        if (data.type === "expense") {
            dispatch(updateExpense({ ...data }));
            dispatch(
                updateAccount(
                    ...mathUpdateExpense(currentOperation, findAccount, data)
                )
            );
        } else {
            dispatch(updateIncomes({ ...data }));
            dispatch(
                updateAccount(
                    ...mathUpdateIncome(currentOperation, findAccount, data)
                )
            );
        }
    };

    if (!accountLoading && !categoryAccountLoading) {
        const accountList = account.map((a) => ({
            label: a.account,
            value: a._id
        }));
        const categoryAccountList = categoryAccount.map((a) => ({
            label: a.name,
            value: a._id
        }));

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        {!isLoading && allOperations.length > 0 ? (
                            <form onSubmit={handleSubmit}>
                                <SelectField
                                    label="Со счёта:"
                                    defaultOption="Выберите счет..."
                                    name="account"
                                    options={accountList}
                                    onChange={handleChange}
                                    value={data.account}
                                    error={errors.account}
                                />
                                <SelectField
                                    label="На категорию:"
                                    defaultOption="Выберите категорию..."
                                    name="category"
                                    options={
                                        data.type === "expense"
                                            ? categoryExpensesList
                                            : categoryAccountList
                                    }
                                    onChange={handleChange}
                                    value={data.category}
                                    error={errors.category}
                                />
                                <TextField
                                    label="Сумма"
                                    name="sum"
                                    type="number"
                                    value={data.sum}
                                    error={errors.sum}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Комментарий"
                                    name="comment"
                                    type="text"
                                    value={data.comment}
                                    onChange={handleChange}
                                />
                                <div className="d-flex justify-content-between">
                                    <Button
                                        type="submit"
                                        disabled={!isValid}
                                        color="light"
                                        icon={
                                            <i className="bi bi-check-lg"></i>
                                        }
                                        rounded="rounded-1"
                                    />
                                    <Button
                                        type="button"
                                        color="light"
                                        onClick={() => history.goBack()}
                                        icon={<i className="bi bi-x-lg"></i>}
                                        rounded="rounded-1"
                                    />
                                </div>
                            </form>
                        ) : (
                            "Loading..."
                        )}
                    </div>
                </div>
            </div>
        );
    }
};

export default EditOperation;
