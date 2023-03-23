import React, { useCallback, useEffect, useState } from "react";
import useOperation from "../../../hooks/useOperation";
import IncomesCard from "../../ui/incomesCard";
import AccountsCard from "../../ui/accountsCard";
import ExpensesCard from "../../ui/expensesCard";
import DonutChartOperations from "../../donutChartOperations";
import Loader from "../../common/loader";
import Button from "../../common/button";

const UserPage = () => {
    const {
        incomes,
        expenses,
        account,
        userId,
        handleClick,
        catAccount,
        catExpenses
    } = useOperation();

    const [showExpense, setShowExpense] = useState(false);

    const [chartData, setChartData] = useState();
    const [chartDataExp, setChartDataExp] = useState();
    const [colorIncome, setColorIncome] = useState();
    const [colorExpense, setColorExpense] = useState();

    const handleShow = useCallback(() => {
        setShowExpense((prevState) => !prevState);
    }, [showExpense]);

    function findCatExpense(expId) {
        if (catExpenses !== null) {
            const find = catExpenses.filter((i) => i._id === expId);
            const result = find.map((n) => n.name).join();
            return result;
        }
    }

    function findCatExpenseColor(expId) {
        if (catExpenses !== null) {
            const find = catExpenses.filter((i) => i._id === expId);
            const result = find.map((n) => n.color).join();
            return result;
        }
    }

    function transformIncomes(data) {
        const result = data.map((i) => ({
            value: i.sum,
            group: findCatAccount(i.category),
            color: findCatAccountColor(i.category)
        }));
        return result;
    }

    function findCatAccount(accId) {
        if (catAccount !== null) {
            const find = catAccount.filter((i) => i._id === accId);
            const result = find.map((n) => n.name).join();
            return result;
        }
    }

    function findCatAccountColor(accId) {
        if (catExpenses !== null) {
            const find = catAccount.filter((i) => i._id === accId);
            const result = find.map((n) => n.color).join();
            return result;
        }
    }

    function transformExpense(data) {
        const result = data.map((i) => ({
            value: i.sum,
            group: findCatExpense(i.category),
            color: findCatExpenseColor(i.category)
        }));
        return result;
    }

    function colorListIncome(data) {
        if (data) {
            const name = data.map((item) => item.group);
            objColorIncome = name.reduce((object, item) => {
                const color = data.find((color) => color.group === item);
                return {
                    ...object,
                    [color.group]: color.color
                };
            }, {});
            return objColorIncome;
        }
    }

    function colorListExpense(data) {
        if (data) {
            const name = data.map((item) => item.group);
            objColorExpense = name.reduce((object, item) => {
                const color = data.find((color) => color.group === item);
                return {
                    ...object,
                    [color.group]: color.color
                };
            }, {});
            return objColorExpense;
        }
    }

    let dataExpenses = [];
    let dataIncomes = [];
    let objColorIncome = {};
    let objColorExpense = {};
    if (expenses && incomes && catAccount && catExpenses !== null) {
        dataExpenses = transformExpense(expenses);
        dataIncomes = transformIncomes(incomes);
        objColorIncome = colorListIncome(chartData);
        objColorExpense = colorListExpense(chartDataExp);
    }
    useEffect(() => {
        setChartData((prevState) => [...dataIncomes]);
        setChartDataExp((prevState) => [...dataExpenses]);
        setColorIncome((prevState) => ({ ...objColorIncome }));
        setColorExpense((prevState) => ({ ...objColorExpense }));
    }, [incomes, expenses]);

    return (
        <div className="container">
            <div className="row gutters-sm justify-content-between">
                <div className=" col-md-4 mt-4">
                    <IncomesCard incomes={incomes} userId={userId} />
                </div>
                <div className=" col-md-4 mt-4">
                    <AccountsCard
                        account={account}
                        handleClick={handleClick}
                        userId={userId}
                    />
                </div>
                <div className="col-md-4 mt-4">
                    <ExpensesCard expenses={expenses} userId={userId} />
                </div>
            </div>
            {chartData && chartDataExp && (
                <div className="mt-4 position-relative">
                    {Object.keys(colorIncome).length > 0 ||
                    Object.keys(colorExpense).length > 0 ? (
                        <div>
                            <Button
                                label={showExpense ? "Расход" : "Доход"}
                                shadow="shadow-sm"
                                color="light"
                                rounded="rounded-1"
                                onClick={handleShow}
                            />
                            <DonutChartOperations
                                showExpense={showExpense}
                                chartData={chartData}
                                chartDataExp={chartDataExp}
                                colorIncome={colorIncome}
                                colorExpense={colorExpense}
                            />
                        </div>
                    ) : (
                        <Loader />
                    )}
                </div>
            )}
        </div>
    );
};

export default UserPage;
