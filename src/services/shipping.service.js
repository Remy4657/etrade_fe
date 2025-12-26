import axiosClient from "@/utils/axios";
import { shippingApi } from "@/api/api";

const ShippingService = {
    getShippingAll: () => {
        return axiosClient.get(shippingApi.GET_SHIPPING_ALL);
    }
};

module.exports = ShippingService