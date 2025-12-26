import axiosClient from "@/utils/axios";
import { paymentApi } from "@/api/api";

const PaymentService = {
    getPaymentAll: () => {
        return axiosClient.get(paymentApi.GET_PAYMENT_ALL);
    }

};

module.exports = PaymentService