import React, { useEffect, useState } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
    getIncomes,
    loadIncomesList,
    removeIncome
} from "../../../store/incomes";
import {
    getExpenses,
    loadExpensesList,
    removeExpense
} from "../../../store/expenses";
import { getCurrentUserId } from "../../../store/user";
import { displayDate } from "../../../utils/displayDate";
import Button from "../../common/button";
import Account from "../../account";
import Category from "../../category";
import {
    getAccount,
    loadAccountList,
    updateAccount
} from "../../../store/accounts";
import {
    mathDeleteExpense,
    mathDeleteIncome
} from "../../../utils/mathOperations";
import history from "../../../utils/history";
import { getCategoryAccount } from "../../../store/categoryAccount";
import { getCategoryExpenses } from "../../../store/categoryExpense";

const OperationsListPage = () => {
    const userId = useSelector(getCurrentUserId());
    const dispatch = useDispatch();
    const incomes = useSelector(getIncomes());
    const expenses = useSelector(getExpenses());
    const acc = useSelector(getAccount());
    const catAcc = useSelector(getCategoryAccount());
    const catExp = useSelector(getCategoryExpenses());

    const accountList = useSelector(getAccount(userId));
    useEffect(() => {
        dispatch(loadAccountList(userId));
    }, [userId]);

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

    let allCategory = [];
    if (catAcc && catExp) {
        allCategory = [...catAcc, ...catExp];
    }
    const allCatList = allCategory.map((c) => ({
        account: c.name,
        _id: c._id
    }));

    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCat, setSelectedCat] = useState();
    const [selectedAcc, setSelectedAcc] = useState();

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCat, selectedAcc]);

    const handleCategorySelect = (item) => {
        setSelectedCat(item);
    };
    const handleAccountSelect = (item) => {
        setSelectedAcc(item);
    };

    const handleDelete = (id, type, idAccount) => {
        allOperations.filter((i) => i._id !== id);
        const findAccount = accountList.filter((a) => a._id === idAccount);
        const findOperation = allOperations.filter((a) => a._id === id);
        if (type === "income") {
            dispatch(
                updateAccount(...mathDeleteIncome(findAccount, findOperation))
            );
            dispatch(removeIncome(id));
        } else {
            dispatch(
                updateAccount(...mathDeleteExpense(findAccount, findOperation))
            );
            dispatch(removeExpense(id));
        }
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const sortedAllOperations = _.orderBy(
        allOperations,
        ["created_at"],
        ["desc"]
    );

    if (incomes && expenses) {
        function filterOperation(data) {
            const filteredCategory = selectedCat
                ? data.filter((c) => c.category === selectedCat)
                : selectedAcc
                ? data.filter((a) => a.account === selectedAcc)
                : data;
            return filteredCategory;
        }

        const filteredCategory = filterOperation(sortedAllOperations);

        const count = filteredCategory.length;
        const operationCrop = paginate(filteredCategory, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedCat();
            setSelectedAcc();
        };

        const operationClick = (itemId) => {
            history.push(`/user/historyOperations/${itemId}`);
        };
        const handleClick = (itemId) => {
            history.push(history.location.pathname + `/${itemId}/edit`);
        };
        return (
            <>
                <div>
                    <div className="d-flex mt-4 align-items-center">
                        <h2 className="text-black-50 m-0 me-1">Фильтр:</h2>
                        <div className="container p-0 fluid d-flex justify-content-between">
                            <div className="d-flex">
                                {acc && (
                                    <GroupList
                                        label="Счет"
                                        selectedItem={selectedAcc}
                                        items={acc}
                                        onItemSelect={handleAccountSelect}
                                    />
                                )}
                                {allCatList && (
                                    <GroupList
                                        label="Категории"
                                        selectedItem={selectedCat}
                                        items={allCatList}
                                        onItemSelect={handleCategorySelect}
                                    />
                                )}
                            </div>
                            <div className="m-1">
                                <Button
                                    color="light"
                                    shadow="shadow-sm"
                                    onClick={() => {
                                        clearFilter();
                                    }}
                                    rounded="rounded-1"
                                    label="Очистить"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        {operationCrop.length > 0 ? (
                            <div>
                                {count > 0 && (
                                    <div className="container text-start mt-4">
                                        <div className=" row row-cols-5">
                                            <div className="col">Дата</div>
                                            <div className="col">Счет</div>
                                            <div className="col">Категория</div>
                                            <div className="col">
                                                Комментарий
                                            </div>
                                            <div className="col">Сумма</div>
                                            {operationCrop.map((item) => (
                                                <div
                                                    key={item._id}
                                                    className="m-0 p-0 col-12 d-flex position-relative"
                                                >
                                                    <button
                                                        onClick={() =>
                                                            operationClick(
                                                                item._id
                                                            )
                                                        }
                                                        className={`btn btn bg-${
                                                            item.type ===
                                                            "income"
                                                                ? "success"
                                                                : "danger"
                                                        }
                                                         m-0 my-1 p-0 py-2 align-items-center text-start bg-opacity-50 d-flex row w-100`}
                                                    >
                                                        <div className="col">
                                                            {displayDate(
                                                                item.created_at
                                                            )}
                                                        </div>
                                                        <div className="col">
                                                            {
                                                                <Account
                                                                    id={
                                                                        item.account
                                                                    }
                                                                />
                                                            }
                                                        </div>
                                                        <div className="col">
                                                            {
                                                                <Category
                                                                    id={
                                                                        item.category
                                                                    }
                                                                    type={
                                                                        item.type
                                                                    }
                                                                />
                                                            }
                                                        </div>
                                                        <div className="col text-truncate">
                                                            {item.comment}
                                                        </div>
                                                        <div className="col">
                                                            {item.sum} р.
                                                        </div>
                                                    </button>
                                                    <div className="col d-flex justify-content-end position-absolute top-50 end-0 translate-middle-y">
                                                        <button
                                                            onClick={() =>
                                                                handleClick(
                                                                    item._id
                                                                )
                                                            }
                                                            className=" bi bi-pencil-square btn btn-sm btn-secondary mx-1"
                                                        ></button>
                                                        <button
                                                            className=" bi bi-trash2 btn btn-danger btn-sm mx-1"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item._id,
                                                                    item.type,
                                                                    item.account
                                                                )
                                                            }
                                                        ></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="d-flex justify-content-center mt-4 bg-light shadow-sm rounded-pill">
                                <h1 className="text-black-50">Нет операций</h1>
                            </div>
                        )}
                    </div>
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </>
        );
    }
    return "Loading";
};

export default OperationsListPage;
