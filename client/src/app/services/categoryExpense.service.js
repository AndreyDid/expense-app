import httpService from "./http.service";
import { categoryExpenseEndPoint } from "../../endPoints";

const categoryExpenseService = {
    get: async () => {
        const { data } = await httpService.get(categoryExpenseEndPoint);
        return data;
    }
};
export default categoryExpenseService;
