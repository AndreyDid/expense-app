import React, { useState } from "react";
import TextField from "../../inputs/textField";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/user";
import { createAccount } from "../../../store/accounts";
import Button from "../../common/button";
import { useHistory } from "react-router-dom";
import useForm from "../../../hooks/useForm";

const CreateAccount = () => {
    const history = useHistory();
    const [data, setData] = useState({
        account: "",
        sum: "0"
    });
    const userId = useSelector(getCurrentUserId());

    const validatorConfig = {
        account: {
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
        dispatch(createAccount({ ...data, userId }));
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="text-black-50">Новый счет:</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Название"
                            name="account"
                            value={data.account}
                            error={errors.account}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Остаток на счете"
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
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;
