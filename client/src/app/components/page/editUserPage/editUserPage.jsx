import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    getCurrentUserData,
    logOut,
    removeUserProfile,
    updateUser
} from "../../../store/user";
import { useHistory } from "react-router-dom";
import { removeIncome } from "../../../store/incomes";
import { removeExpense } from "../../../store/expenses";
import { removeCategoryAccount } from "../../../store/categoryAccount";
import { removeAccount } from "../../../store/accounts";
import TextField from "../../form/textField";
import Button from "../../common/button";
import useForm from "../../../hooks/useForm";
import ContainerFormWrapper from "../../common/containerForm";
import useOperation from "../../../hooks/useOperation";

const EditUserPage = () => {
    const { account, catAccount, incomes, expenses } = useOperation();
    const history = useHistory();
    const currentUser = useSelector(getCurrentUserData());
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен не корректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };

    const { handleChange, isValid, validate, errors, dispatch } = useForm(
        validatorConfig,
        data,
        setData
    );

    useEffect(() => {
        if (currentUser && !data) {
            setData({ ...currentUser });
        }
    }, [currentUser, data]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(
            updateUser({
                ...data
            })
        );
    };

    const handleDelete = async (id) => {
        if (incomes && expenses && catAccount && account !== null) {
            const findIncome = incomes.filter((i) => i.userId === id);
            const findExpense = expenses.filter((i) => i.userId === id);
            const findCatAccount = catAccount.filter((i) => i.userId === id);
            const findAccount = account.filter((i) => i.userId === id);
            for (const item of findIncome) {
                dispatch(removeIncome(item._id));
            }
            for (const item of findExpense) {
                dispatch(removeExpense(item._id));
            }
            for (const item of findCatAccount) {
                dispatch(removeCategoryAccount(item._id));
            }
            for (const item of findAccount) {
                dispatch(removeAccount(item._id));
            }
        }
        await dispatch(removeUserProfile(id));
        dispatch(logOut());
    };

    return (
        <ContainerFormWrapper>
            <div>
                {!isLoading ? (
                    <form onSubmit={handleSubmit}>
                        <div className="d-flex px-3 justify-content-end">
                            <Button
                                label="Удалить аккаунт"
                                color="danger"
                                rounded="rounded-3"
                                onClick={() => handleDelete(currentUser._id)}
                            />
                        </div>
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
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
        </ContainerFormWrapper>
    );
};

export default EditUserPage;
