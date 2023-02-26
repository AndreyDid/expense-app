import httpService from "./http.service";
import { incomeEndPoint } from "../../endPoints";

const incomesService = {
    createIncome: async (payload) => {
        const { data } = await httpService.post(incomeEndPoint, payload);
        return data;
    },
    getIncomes: async (userId) => {
        const { data } = await httpService.get(incomeEndPoint, {
            params: {
                orderBy: "userId",
                equalTo: `${userId}`
            }
        });
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            incomeEndPoint + payload._id,
            payload
        );
        return data;
    },
    removeIncomes: async (incomeId) => {
        const { data } = await httpService.delete(incomeEndPoint + incomeId);
        return data;
    }
};
export default incomesService;
