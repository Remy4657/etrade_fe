import axiosClient from "@/utils/axios";
import { orderApi } from "@/api/api";

const OrderService = {
    getAll: () => {
        return axiosClient.get(orderApi.GET_ALL);
    },
    getDetail: (orderId) => {
        return axiosClient.get(`${orderApi.GET_DETAIL}/${orderId}`);
    }
};

module.exports = OrderService