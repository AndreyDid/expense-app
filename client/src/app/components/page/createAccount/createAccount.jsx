import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/user";
import { createAccount } from "../../../store/accounts";
import { useHistory } from "react-router-dom";
import TextField from "../../form/textField";
import Button from "../../common/button";
import useForm from "../../../hooks/useForm";
import ContainerFormWrapper from "../../common/containerForm";
import CardTitle from "../../common/typografy/cardTitle";
import TextAreaField from "../../form/TextAreaField";

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
        <ContainerFormWrapper>
            <div>
                <CardTitle>Новый счет:</CardTitle>
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
            </div>
        </ContainerFormWrapper>
    );
};

export default CreateAccount;
