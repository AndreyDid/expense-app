import React from "react";
import { useParams } from "react-router-dom";
import OperationsPage from "../components/page/operationsPage/operationsPage";
import OperationsListPage from "../components/page/operationListPage/operationsListPage";

const HistoryOperations = () => {
    const params = useParams();
    const { operationsId } = params;
    return (
        <>
            {operationsId ? (
                <OperationsPage operationsId={operationsId} />
            ) : (
                <OperationsListPage />
            )}
        </>
    );
};

export default HistoryOperations;
