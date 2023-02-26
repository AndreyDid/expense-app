import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
    getCategoryExpenseById,
    getCategoryExpensesLoadingStatus
} from "../store/categoryExpense";
import {
    getCategoryAccountById,
    getCategoryAccountLoadingStatus,
    loadCategoryAccountList
} from "../store/categoryAccount";
import { getCurrentUserId } from "../store/user";

const Category = ({ id, type }) => {
    const dispatch = useDispatch();
    const userId = useSelector(getCurrentUserId());
    useEffect(() => {
        dispatch(loadCategoryAccountList(userId));
    }, [userId]);
    const isLoadingAcc = useSelector(getCategoryAccountLoadingStatus());
    const isLoadingExp = useSelector(getCategoryExpensesLoadingStatus());
    const catAcc = useSelector(getCategoryAccountById(id));
    const catExp = useSelector(getCategoryExpenseById(id));

    if (type === "income") {
        if (catAcc && !isLoadingAcc) {
            return <p className="small m-0">{catAcc.name}</p>;
        } else return "Loading...";
    } else {
        if (catExp && !isLoadingExp) {
            return <p className="small m-0">{catExp.name}</p>;
        } else return "Loading...";
    }
};
Category.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string
};

export default Category;
