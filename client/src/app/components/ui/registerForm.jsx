import React, { useState } from "react";
import TextField from "../inputs/textField";
import { signUp } from "../../store/user";
import useForm from "../../hooks/useForm";

const RegisterForm = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

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
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должено состоять минимум из 2 символов",
                value: 2
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
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
        const newData = { ...data };
        dispatch(signUp(newData));
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Имя пользователя"
                name="name"
                onChange={handleChange}
                value={data.name}
                error={errors.name}
            />
            <TextField
                label="Электронная почта"
                name="email"
                onChange={handleChange}
                value={data.email}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                onChange={handleChange}
                value={data.password}
                error={errors.password}
            />
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Зарегистрироваться
            </button>
        </form>
    );
};

export default RegisterForm;
