import React, { useEffect } from "react";
import {
    getIsLoggedIn,
    getUsersLoadingStatus,
    loadUsersList
} from "../../../store/user";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../../layouts/login";
import { loadCategoryExpensesList } from "../../../store/categoryExpense";
import Loader from "../../common/loader";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const usersStatusLoading = useSelector(getUsersLoadingStatus());
    useEffect(() => {
        dispatch(loadCategoryExpensesList());
        if (isLoggedIn) {
            dispatch(loadUsersList());
        }
    }, [isLoggedIn]);
    if (!isLoggedIn) return <Login />;
    if (usersStatusLoading) return <Loader />;
    return children;
};
AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default AppLoader;
