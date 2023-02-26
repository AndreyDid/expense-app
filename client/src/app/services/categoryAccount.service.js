import httpService from "./http.service";
import { categoryAccountEndPoint } from "../../endPoints";

const categoryAccountsService = {
    createCategoryAccount: async (payload) => {
        const { data } = await httpService.post(
            categoryAccountEndPoint,
            payload
        );
        return data;
    },
    getCategoryAccount: async (userId) => {
        const { data } = await httpService.get(categoryAccountEndPoint, {
            params: {
                orderBy: "userId",
                equalTo: `${userId}`
            }
        });
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            categoryAccountEndPoint + payload._id,
            payload
        );
        return data;
    },
    removeCategoryAccount: async (accountId) => {
        const { data } = await httpService.delete(
            categoryAccountEndPoint + accountId
        );
        return data;
    }
};
export default categoryAccountsService;
