import httpService from "./http.service";
import { expenseEndPoint } from "../../endPoints";

const expensesService = {
    createExpense: async (payload) => {
        const { data } = await httpService.post(expenseEndPoint, payload);
        return data;
    },
    getExpenses: async (userId) => {
        const { data } = await httpService.get(expenseEndPoint, {
            params: {
                orderBy: "userId",
                equalTo: `${userId}`
            }
        });
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            expenseEndPoint + payload._id,
            payload
        );
        return data;
    },
    removeExpenses: async (expenseId) => {
        const { data } = await httpService.delete(expenseEndPoint + expenseId);
        return data;
    }
};
export default expensesService;
