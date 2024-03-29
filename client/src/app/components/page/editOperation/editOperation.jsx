import React, { useEffect, useState } from "react";
import { getCategoryExpenses } from "../../../store/categoryExpense";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateIncomes } from "../../../store/incomes";
import {
    getExpensesLoadingStatus,
    updateExpense
} from "../../../store/expenses";
import {
    getAccountLoadingStatus,
    updateAccount
} from "../../../store/accounts";
import {
    getCategoryAccount,
    getCategoryAccountLoadingStatus
} from "../../../store/categoryAccount";
import {
    mathChangeSumAccount,
    mathUpdateExpense,
    mathUpdateSumIncome,
    mathUpdateSumChangeAccount
} from "../../../utils/mathOperations";
import TextField from "../../form/textField";
import Button from "../../common/button";
import SelectField from "../../form/selectField";
import useForm from "../../../hooks/useForm";
import useOperation from "../../../hooks/useOperation";
import Loader from "../../common/loader";
import ContainerFormWrapper from "../../common/containerForm";
import TextAreaField from "../../form/TextAreaField";

const EditOperation = () => {
    const { expenses, incomes, account, params } = useOperation();

    const [data, setData] = useState();

    const history = useHistory();
    const { operationsId } = params;

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);
    let allOperations = [];
    if (incomes && expenses) {
        allOperations = [...incomes, ...expenses];
    }
    const currentOperation = allOperations.find((i) => i._id === operationsId);

    const categoryExpenses = useSelector(getCategoryExpenses());
    const categoryExpensesLoading = useSelector(getExpensesLoadingStatus());
    const accountLoading = useSelector(getAccountLoadingStatus());

    const categoryAccount = useSelector(getCategoryAccount());
    const categoryAccountLoading = useSelector(
        getCategoryAccountLoadingStatus()
    );

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
            setData({ ...currentOperation });
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
        const thisAccount = account.filter(
            (a) => a._id === currentOperation.account
        );
        if (data.type === "expense") {
            dispatch(updateExpense({ ...data }));
            dispatch(
                updateAccount(
                    ...mathUpdateExpense(currentOperation, findAccount, data)
                )
            );
        } else {
            dispatch(updateIncomes({ ...data }));
            if (currentOperation.account !== data.account) {
                dispatch(
                    updateAccount(...mathChangeSumAccount(thisAccount, data))
                );
                dispatch(
                    updateAccount(
                        ...mathUpdateSumChangeAccount(findAccount, data)
                    )
                );
            } else {
                dispatch(
                    updateAccount(
                        ...mathUpdateSumIncome(
                            currentOperation,
                            findAccount,
                            data
                        )
                    )
                );
            }
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
        const categoryExpensesList = categoryExpenses.map((c) => ({
            label: c.name,
            value: c._id
        }));

        return (
            <ContainerFormWrapper>
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
                        <TextAreaField
                            label="Комментарий"
                            name="comment"
                            type="text"
                            value={data.comment || ""}
                            onChange={handleChange}
                        />
                        <div className="d-flex justify-content-between">
                            <Button
                                type="submit"
                                disabled={!isValid}
                                color="light"
                                icon={<i className="bi bi-check-lg"></i>}
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
                    <Loader />
                )}
            </ContainerFormWrapper>
        );
    }
};

export default EditOperation;
