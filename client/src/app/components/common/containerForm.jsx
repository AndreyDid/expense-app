import React from "react";
import PropTypes from "prop-types";

const ContainerFormWrapper = ({ children }) => {
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow-sm bg-light p-4 rounded-4 border">
                    {children}
                </div>
            </div>
        </div>
    );
};
ContainerFormWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ContainerFormWrapper;
