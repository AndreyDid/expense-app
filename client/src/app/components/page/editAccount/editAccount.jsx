import React, { useEffect, useState } from "react";
import TextField from "../../inputs/textField";
import Button from "../../common/button";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
    getAccountById,
    getAccountLoadingStatus,
    removeAccount,
    updateAccount
} from "../../../store/accounts";
import useForm from "../../../hooks/useForm";
import { getExpenses, removeExpense } from "../../../store/expenses";
import { getIncomes, removeIncome } from "../../../store/incomes";

const EditAccount = () => {
    const history = useHistory();
    const params = useParams();
    const { accountId } = params;
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const currentAccount = useSelector(getAccountById(accountId));
    const accountLoading = useSelector(getAccountLoadingStatus());

    const incomes = useSelector(getIncomes());
    const expenses = useSelector(getExpenses());

    useEffect(() => {
        if (data && isLoading && currentAccount && !accountLoading) {
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
        if (currentAccount && !data && !accountLoading) {
            setData((prevState) => ({ ...currentAccount }));
        }
    }, [currentAccount, data, accountLoading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(updateAccount({ ...data }));
        history.goBack();
    };

    const handleDelete = (id) => {
        if (incomes.length > 0 && expenses.length > 0) {
            const findIncome = incomes.filter((i) => i.account === id);
            const findExpense = expenses.filter((i) => i.account === id);
            for (const id of findIncome) {
                dispatch(removeIncome(id._id));
            }
            for (const id of findExpense) {
                dispatch(removeExpense(id._id));
            }
        } else if (incomes.length > 0) {
            const findIncome = incomes.filter((i) => i.account === id);
            for (const id of findIncome) {
                dispatch(removeIncome(id._id));
            }
        } else {
            const findExpense = expenses.filter((i) => i.account === id);
            for (const id of findExpense) {
                dispatch(removeExpense(id._id));
            }
        }
        dispatch(removeAccount(id));
        history.goBack();
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && !currentAccount.length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex justify-content-end">
                                <Button
                                    type="button"
                                    color="danger"
                                    size="btn-sm"
                                    onClick={() =>
                                        handleDelete(currentAccount._id)
                                    }
                                    icon={<i className="bi bi-trash-fill"></i>}
                                    rounded="rounded-1"
                                />
                            </div>
                            <TextField
                                label="Название"
                                name="account"
                                type="text"
                                value={data.account}
                                error={errors.account}
                                onChange={handleChange}
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
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditAccount;
