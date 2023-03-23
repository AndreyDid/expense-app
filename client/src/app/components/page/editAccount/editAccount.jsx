import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeExpense } from "../../../store/expenses";
import { removeIncome } from "../../../store/incomes";
import {
    getAccountById,
    getAccountLoadingStatus,
    removeAccount,
    updateAccount
} from "../../../store/accounts";
import TextField from "../../form/textField";
import Button from "../../common/button";
import useForm from "../../../hooks/useForm";
import useOperation from "../../../hooks/useOperation";
import Loader from "../../common/loader";
import ContainerFormWrapper from "../../common/containerForm";
import TextAreaField from "../../form/TextAreaField";

const EditAccount = () => {
    const { incomes, expenses, params } = useOperation();

    const history = useHistory();
    const { accountId } = params;

    const currentAccount = useSelector(getAccountById(accountId));
    const accountLoading = useSelector(getAccountLoadingStatus());

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (isLoading && currentAccount && !accountLoading) {
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
            setData({ ...currentAccount });
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
            for (const item of findIncome) {
                dispatch(removeIncome(item._id));
            }
            for (const item of findExpense) {
                dispatch(removeExpense(item._id));
            }
        } else if (incomes.length > 0) {
            const findIncome = incomes.filter((i) => i.account === id);
            for (const item of findIncome) {
                dispatch(removeIncome(item._id));
            }
        } else {
            const findExpense = expenses.filter((i) => i.account === id);
            for (const item of findExpense) {
                dispatch(removeExpense(item._id));
            }
        }
        dispatch(removeAccount(id));
        history.goBack();
    };
    return (
        <ContainerFormWrapper>
            <div>
                {!isLoading && !currentAccount.length > 0 ? (
                    <form onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-end">
                            <Button
                                type="button"
                                color="danger"
                                size="btn-sm"
                                onClick={() => handleDelete(currentAccount._id)}
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
            </div>
        </ContainerFormWrapper>
    );
};

export default EditAccount;
