import React, { useState } from "react";
import { getAuthErrors, logIn } from "../../store/user";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import TextField from "../form/textField";
import useForm from "../../hooks/useForm";
import Button from "../common/button";

const LoginForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const loginError = useSelector(getAuthErrors());

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
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
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : `/user`;
        dispatch(logIn({ payload: data, redirect }));
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            {loginError && <p className="text-danger">{loginError}</p>}
            <div className="container">
                <Button
                    label="Войти"
                    rounded="rounded-1"
                    color="primary"
                    type="submit"
                    disabled={!isValid}
                    width="w-100"
                />
            </div>
        </form>
    );
};

export default LoginForm;
