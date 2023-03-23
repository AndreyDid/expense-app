import React from "react";
import PropTypes from "prop-types";
import Button from "../common/button";

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    name,
    error,
    onDelete,
    type
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;
    return (
        <div className="mb-4 container-fluid">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <div className="d-flex">
                <select
                    className={getInputClasses()}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                >
                    <option>{defaultOption}</option>
                    {optionsArray.length > 0 &&
                        optionsArray.map((option) => (
                            <option value={option.value} key={option.value}>
                                {option.label}
                            </option>
                        ))}
                </select>
                {type === "addDelete" && (
                    <div className="ms-1">
                        <Button
                            color="danger"
                            rounded="rounded-1"
                            icon={<i className="bi bi-trash-fill"></i>}
                            onClick={onDelete}
                        />
                    </div>
                )}
            </div>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
SelectField.propTypes = {
    defaultOption: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
    error: PropTypes.string,
    type: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SelectField;
