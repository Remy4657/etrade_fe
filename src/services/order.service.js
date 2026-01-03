import axiosClient from "@/utils/axios";
import { orderApi } from "@/api/api";

const OrderService = {
    getAll: () => {
        return axiosClient.get(orderApi.GET_ALL);
    }
};

module.exports = OrderService