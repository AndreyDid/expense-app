import React from "react";
import PropTypes from "prop-types";

const CardTitle = ({ children }) => {
    return <h3 className="container text-black-50">{children}</h3>;
};
CardTitle.propTypes = {
    children: PropTypes.node
};

export default CardTitle;
