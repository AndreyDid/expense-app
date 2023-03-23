import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { paginate } from "../../../utils/paginate";
import { removeIncome } from "../../../store/incomes";
import { removeExpense } from "../../../store/expenses";
import { displayDate } from "../../../utils/displayDate";
import { updateAccount } from "../../../store/accounts";
import { getCategoryAccount } from "../../../store/categoryAccount";
import { getCategoryExpenses } from "../../../store/categoryExpense";
import {
    mathDeleteExpense,
    mathDeleteIncome
} from "../../../utils/mathOperations";
import useOperation from "../../../hooks/useOperation";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import Button from "../../common/button";
import Loader from "../../common/loader";
import _ from "lodash";
import Account from "../../account";
import Category from "../../category";
import history from "../../../utils/history";

const OperationsListPage = () => {
    const { incomes, expenses, account, dispatch, allOperations } =
        useOperation();

    const catAccount = useSelector(getCategoryAccount());
    const catExpense = useSelector(getCategoryExpenses());
    let allCategory = [];
    if (catAccount && catExpense) {
        allCategory = [...catAccount, ...catExpense];
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
        const findAccount = account.filter((a) => a._id === idAccount);
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
            <div className="container">
                <div className="text-black-50 mt-4 me-1">
                    <h3>Фильтр:</h3>
                </div>
                <div className="d-flex mt-1 align-items-center">
                    <div className=" p-0 container d-flex justify-content-between">
                        <div className="d-flex">
                            {account && (
                                <GroupList
                                    label="Счет"
                                    selectedItem={selectedAcc}
                                    items={account}
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
                                <div className="text-start mt-4">
                                    <div>
                                        {operationCrop.map((item) => (
                                            <div
                                                key={item._id}
                                                className="d-flex position-relative"
                                            >
                                                <div className="mt-3 me-2 d-flex justify-content-end position-absolute top-0 end-0 ">
                                                    <button
                                                        onClick={() =>
                                                            handleClick(
                                                                item._id
                                                            )
                                                        }
                                                        className="bi bi-pencil-square btn btn-sm btn-secondary mx-1"
                                                    ></button>
                                                    <button
                                                        className="bi bi-trash2 btn btn-danger btn-sm mx-1"
                                                        onClick={() =>
                                                            handleDelete(
                                                                item._id,
                                                                item.type,
                                                                item.account
                                                            )
                                                        }
                                                    ></button>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        operationClick(item._id)
                                                    }
                                                    className={`btn btn bg-${
                                                        item.type === "income"
                                                            ? "success"
                                                            : "danger"
                                                    }
                                                         m-0 my-1 p-0 py-2 align-items-center text-start bg-opacity-50 d-flex row w-100`}
                                                >
                                                    <div className="fs-4 fw-bold text-black-50">
                                                        {displayDate(
                                                            item.created_at
                                                        )}
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="me-2">
                                                            <div className="fw-semibold">
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
                                                            <div className="small">
                                                                {
                                                                    <Account
                                                                        id={
                                                                            item.account
                                                                        }
                                                                    />
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="me-2 text-truncate">
                                                            {item.comment}
                                                        </div>
                                                        {item.type ===
                                                        "income" ? (
                                                            <div className="fs-4 fw-bold">
                                                                +{item.sum}р.
                                                            </div>
                                                        ) : (
                                                            <div className="fs-4 fw-bold">
                                                                -{item.sum}p.
                                                            </div>
                                                        )}
                                                    </div>
                                                </button>
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
                <div className="d-flex justify-content-center mt-1">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        );
    }
    return <Loader />;
};

export default React.memo(OperationsListPage);
