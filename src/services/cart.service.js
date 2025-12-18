import axiosClient from "@/utils/axios";
import { cartApi } from "@/api/api";

const CartService = {
    addToCart: (product) => {
        return axiosClient.post(cartApi.ADD_TO_CART, { ...product });
    },
    getCart: () => {
        return axiosClient.get(cartApi.GET_CART);
    },
};

module.exports = CartService