import React, { useEffect, useState } from "react";
import TextField from "../../inputs/textField";
import { getCurrentUserId } from "../../../store/user";
import { useSelector } from "react-redux";
import { createIncomes } from "../../../store/incomes";
import SelectField from "../../inputs/selectField";
import {
    getAccount,
    getAccountLoadingStatus,
    loadAccountList,
    updateAccount
} from "../../../store/accounts";
import Button from "../../common/button";
import { useHistory } from "react-router-dom";
import { mathIncome } from "../../../utils/mathOperations";
import {
    createCategoryAccount,
    getCategoryAccount,
    getCategoryAccountLoadingStatus,
    loadCategoryAccountList,
    removeCategoryAccount
} from "../../../store/categoryAccount";
import useForm from "../../../hooks/useForm";

const CreateIncome = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    const [data, setData] = useState({
        account: "",
        category: "",
        sum: ""
    });
    const [dataCategory, setDataCategory] = useState({
        name: ""
    });
    const userId = useSelector(getCurrentUserId());
    const account = useSelector(getAccount());
    const accountLoading = useSelector(getAccountLoadingStatus());

    const categoryAccount = useSelector(getCategoryAccount());
    const categoryAccountLoading = useSelector(
        getCategoryAccountLoadingStatus()
    );
    const [showCreateCategory, setShowCreateCategory] = useState(true);
    const toggleShowCreateCategory = () => {
        setShowCreateCategory((prevState) => !prevState);
    };
    useEffect(() => {
        if (account && categoryAccount && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    useEffect(() => {
        dispatch(loadAccountList(userId));
    }, [userId]);
    useEffect(() => {
        dispatch(loadCategoryAccountList(userId));
    }, [userId]);

    const handleChangeCategory = (target) => {
        setDataCategory((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const createCategory = (e) => {
        e.preventDefault();
        dispatch(createCategoryAccount({ ...dataCategory, userId }));
        toggleShowCreateCategory(true);
    };
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
        dispatch(createIncomes({ ...data, userId }));
        dispatch(updateAccount(...mathIncome(findAccount, data)));
    };

    const handleDelete = (id) => {
        dispatch(removeCategoryAccount(id));
    };

    if (!accountLoading && !categoryAccountLoading) {
        const accountList = account.map((a) => ({
            label: a.account,
            value: a._id
        }));

        const categoryAccountList = categoryAccount.map((c) => ({
            label: c.name,
            value: c._id
        }));

        return (
            <div className="container mt-5">
                {accountList.length > 0 ? (
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <h3 className="text-black-50">Доход:</h3>
                            <form onSubmit={handleSubmit}>
                                <SelectField
                                    label="На счет:"
                                    defaultOption="Выберите счет..."
                                    name="account"
                                    options={accountList}
                                    onChange={handleChange}
                                    value={data.account}
                                    error={errors.account}
                                />
                                <div>
                                    <div className="d-flex justify-content-end">
                                        <Button
                                            label={
                                                showCreateCategory
                                                    ? "Создать категорию"
                                                    : ""
                                            }
                                            onClick={toggleShowCreateCategory}
                                            color="light"
                                            rounded="rounded-1"
                                            icon={
                                                !showCreateCategory && (
                                                    <i className="bi bi-arrow-left"></i>
                                                )
                                            }
                                        />
                                    </div>
                                    {showCreateCategory === false ? (
                                        <div>
                                            <TextField
                                                label="Новая категория"
                                                name="name"
                                                type="text"
                                                value={dataCategory.name}
                                                error={errors.name}
                                                onChange={handleChangeCategory}
                                            />
                                            <Button
                                                onClick={createCategory}
                                                color="light"
                                                icon={
                                                    <i className="bi bi-check-lg"></i>
                                                }
                                                rounded="rounded-1"
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <SelectField
                                                label="Категория:"
                                                defaultOption="Выберите категорию..."
                                                name="category"
                                                options={categoryAccountList}
                                                value={data.category}
                                                error={errors.category}
                                                onChange={handleChange}
                                            />
                                            <div className="d-flex justify-content-end">
                                                <Button
                                                    color="danger"
                                                    size="btn-sm"
                                                    rounded="rounded-1"
                                                    icon={
                                                        <i className="bi bi-trash-fill"></i>
                                                    }
                                                    onClick={() =>
                                                        handleDelete(
                                                            data.category
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <TextField
                                    label="Сумма"
                                    name="sum"
                                    type="number"
                                    value={data.sum}
                                    onChange={handleChange}
                                    error={errors.sum}
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
                                        color="light"
                                        disabled={!isValid}
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
                        </div>
                    </div>
                ) : (
                    <div>
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

export default CreateIncome;
