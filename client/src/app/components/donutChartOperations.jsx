import React from "react";
import PropTypes from "prop-types";
import { DonutChart } from "@carbon/charts-react";

import "@carbon/charts/styles.css";

const DonutChartOperations = ({
    showExpense,
    chartData,
    chartDataExp,
    colorIncome,
    colorExpense
}) => {
    const chartOptionsIncomes = {
        toolbar: {
            enabled: false
        },
        resizable: true,
        legend: {
            alignment: "center"
        },
        donut: {
            center: {
                label: "Доход"
            },
            alignment: "center"
        },
        pie: {
            labels: {
                enabled: false
            }
        },
        color: {
            scale: colorIncome
        },
        height: "400px"
    };

    const chartOptionsExpense = {
        toolbar: {
            enabled: false
        },
        resizable: true,
        legend: {
            alignment: "center"
        },
        donut: {
            center: {
                label: "Расход"
            },
            alignment: "center"
        },
        pie: {
            labels: {
                enabled: false
            }
        },
        color: {
            scale: colorExpense
        },
        height: "400px"
    };
    return (
        <>
            <div>
                {showExpense && colorIncome && colorExpense ? (
                    <DonutChart
                        data={chartData}
                        options={chartOptionsIncomes}
                    />
                ) : (
                    <DonutChart
                        data={chartDataExp}
                        options={chartOptionsExpense}
                    />
                )}
            </div>
        </>
    );
};
DonutChartOperations.propTypes = {
    showExpense: PropTypes.bool,
    handleShow: PropTypes.func,
    chartData: PropTypes.array,
    chartDataExp: PropTypes.array,
    colorIncome: PropTypes.object,
    colorExpense: PropTypes.object
};

export default React.memo(DonutChartOperations);
