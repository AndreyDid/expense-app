import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUserData, updateUser } from "../../../store/user";
import TextField from "../../inputs/textField";
import Button from "../../common/button";
import { useHistory } from "react-router-dom";
import useForm from "../../../hooks/useForm";

const EditUserPage = () => {
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
            setData((prevState) => ({
                ...currentUser
            }));
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

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4 rounded-1">
                    {!isLoading ? (
                        <form onSubmit={handleSubmit}>
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
            </div>
        </div>
    );
};

export default EditUserPage;
