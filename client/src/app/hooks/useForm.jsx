import { useEffect, useState } from "react";
import { validator } from "../utils/validator";
import { useDispatch } from "react-redux";

const useForm = (validatorConfig, data, setData) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    return {
        handleChange,
        isValid,
        validate,
        errors,
        useEffect,
        data,
        dispatch
    };
};

export default useForm;
