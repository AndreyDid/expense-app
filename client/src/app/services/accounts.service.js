import httpService from "./http.service";
import { accountEndPoint } from "../../endPoints";

const accountsService = {
    createAccount: async (payload) => {
        const { data } = await httpService.post(accountEndPoint, payload);
        return data;
    },
    getAccount: async (userId) => {
        const { data } = await httpService.get(accountEndPoint, {
            params: {
                orderBy: "userId",
                equalTo: `${userId}`
            }
        });
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            accountEndPoint + payload._id,
            payload
        );
        return data;
    },
    removeAccount: async (accountId) => {
        const { data } = await httpService.delete(accountEndPoint + accountId);
        return data;
    }
};
export default accountsService;
