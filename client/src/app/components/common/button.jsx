import React from "react";
import PropTypes from "prop-types";

const Button = ({
    size,
    color,
    label,
    onClick,
    type,
    rounded,
    disabled,
    icon,
    shadow
}) => {
    return (
        <button
            type={type}
            className={`btn btn-${color} ${size} ${rounded} ${shadow}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon} {label}
        </button>
    );
};
Button.defaultProps = {
    color: "primary",
    type: "button",
    rounded: "rounded-0",
    disabled: false
};

Button.propTypes = {
    type: PropTypes.oneOf(["button", "submit"]),
    size: PropTypes.oneOf(["btn-sm", "btn-lg"]),
    shadow: PropTypes.oneOf([
        "shadow",
        "shadow-sm",
        "shadow-lg",
        "shadow-none"
    ]),
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
        "link"
    ]),
    rounded: PropTypes.oneOf(["rounded-0", "rounded-1", "rounded-pill"]),
    label: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.element])
};

export default Button;
