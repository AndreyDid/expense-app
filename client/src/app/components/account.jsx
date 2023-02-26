import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getAccountById, getAccountLoadingStatus } from "../store/accounts";

const Account = ({ id }) => {
    const isLoading = useSelector(getAccountLoadingStatus());
    const acc = useSelector(getAccountById(id));
    if (acc && !isLoading) {
        return <p className="m-0">{acc.account}</p>;
    } else return "Loading...";
};
Account.propTypes = {
    id: PropTypes.string
};

export default Account;
