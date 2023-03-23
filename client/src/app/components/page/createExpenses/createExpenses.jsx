import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/user";
import { createExpenses } from "../../../store/expenses";
import { useHistory } from "react-router-dom";
import { mathExpense } from "../../../utils/mathOperations";
import {
    getCategoryExpenses,
    getCategoryExpensesLoadingStatus,
    loadCategoryExpensesList
} from "../../../store/categoryExpense";
import {
    getAccount,
    getAccountLoadingStatus,
    loadAccountList,
    updateAccount
} from "../../../store/accounts";
import Button from "../../common/button";
import TextField from "../../form/textField";
import SelectField from "../../form/selectField";
import useForm from "../../../hooks/useForm";
import ContainerFormWrapper from "../../common/containerForm";
import CardTitle from "../../common/typografy/cardTitle";
import TextAreaField from "../../form/TextAreaField";

const CreateExpenses = () => {
    const history = useHistory();
    const [data, setData] = useState({
        account: "",
        category: "",
        sum: ""
    });
    const userId = useSelector(getCurrentUserId());
    const category = useSelector(getCategoryExpenses());
    const categoryExpensesLoading = useSelector(
        getCategoryExpensesLoadingStatus()
    );
    const account = useSelector(getAccount());
    const accountLoading = useSelector(getAccountLoadingStatus());
    useEffect(() => {
        dispatch(loadAccountList(userId));
    }, [userId]);
    useEffect(() => {
        dispatch(loadCategoryExpensesList());
    }, [userId]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const findAccount = account.filter((a) => a._id === data.account);
        dispatch(createExpenses({ ...data, userId }));
        dispatch(updateAccount(...mathExpense(findAccount, data)));
    };

    if (!accountLoading && !categoryExpensesLoading) {
        const accountList = account.map((a) => ({
            label: a.account,
            value: a._id
        }));
        const categoryList = category.map((c) => ({
            label: c.name,
            value: c._id
        }));

        return (
            <div>
                {accountList.length > 0 ? (
                    <ContainerFormWrapper>
                        <form onSubmit={handleSubmit}>
                            <CardTitle>Расход:</CardTitle>
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
                                options={categoryList}
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
                                    color="light"
                                    disabled={!isValid}
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
                    </ContainerFormWrapper>
                ) : (
                    <div className="mt-4">
                        <Button
                            onClick={() => history.goBack()}
                            shadow="shadow-sm"
                            label="назад"
                            rounded="rounded-pill"
                            color="light"
                            icon={<i className="bi bi-arrow-left-short"></i>}
                        />
                        <div className="d-flex justify-content-center mt-4 bg-light shadow-sm rounded-pill">
                            <h1 className="text-black-50">Создайте счет</h1>
                        </div>
                    </div>
                )}
            </div>
        );
    }
};
export default CreateExpenses;
