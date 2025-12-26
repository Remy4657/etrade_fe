import axiosClient from "@/utils/axios";
import { checkoutApi } from "@/api/api";

const CheckoutService = {
    checkout: (data) => {
        return axiosClient.post(checkoutApi.CHECKOUT, data);
    }
};

module.exports = CheckoutService