import React, { useEffect } from "react";
import { displayDate } from "../../../utils/displayDate";
import { getCurrentUserId } from "../../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses, loadExpensesList } from "../../../store/expenses";
import { getIncomes, loadIncomesList } from "../../../store/incomes";
import Category from "../../category";
import Account from "../../account";
import Button from "../../common/button";
import Loader from "../../common/loader";
import PropTypes from "prop-types";
import history from "../../../utils/history";

const OperationsPage = ({ operationsId }) => {
    const userId = useSelector(getCurrentUserId());
    const expenses = useSelector(getExpenses());
    const incomes = useSelector(getIncomes());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadIncomesList(userId));
    }, [userId]);
    useEffect(() => {
        dispatch(loadExpensesList(userId));
    }, [userId]);

    let allOperations = [];
    if (incomes && expenses) {
        allOperations = [...incomes, ...expenses];
    }

    const findOperation = allOperations.find((i) => i._id === operationsId);
    const handleClick = () => {
        history.push("/user/historyOperations");
    };
    const editClick = () => {
        history.push(`/user/historyOperations/${operationsId}/edit`);
    };
    if (expenses && incomes) {
        return (
            <div className="container w-50 bg-light shadow-sm m-4 p-4">
                <div className="d-flex justify-content-between">
                    {findOperation.type === "expense" ? (
                        <h3 className="m-0">Расход:</h3>
                    ) : (
                        <h3 className="m-0">Доход:</h3>
                    )}
                    <Button
                        onClick={editClick}
                        color="secondary"
                        rounded="rounded-1"
                        size="btn-sm"
                        icon={<i className="bi bi-pencil-square"></i>}
                    />
                </div>
                <div className="mt-1">
                    <div className="m-1">
                        Дата создания:{" "}
                        {displayDate(findOperation.created_at)}
                    </div>
                    <div className="d-flex m-1">
                        Со счёта:
                        <div className="mx-1">
                            <Account id={findOperation.account}/>
                        </div>
                    </div>
                    <div className="d-flex align-items-center m-1">
                        На категорию:
                        <div className="mx-1">
                            <Category
                                id={findOperation.category}
                                type={findOperation.type}
                            />
                        </div>
                    </div>
                    <div className="m-1">Коментарий:</div>
                    <div>{findOperation.comment}</div>
                    <h3>Сумма: {findOperation.sum} р.</h3>
                    <div className="d-flex justify-content-end">
                        <Button
                            label="Все операции"
                            onClick={handleClick}
                            color="secondary"
                            rounded="rounded-1"
                            size="btn-sm"
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return <Loader/>;
    }
};
OperationsPage.propTypes = {
    operationsId: PropTypes.string
};

export default OperationsPage;
