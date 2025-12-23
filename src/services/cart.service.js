import axiosClient from "@/utils/axios";
import { cartApi } from "@/api/api";

const CartService = {
    addToCart: (product) => {
        return axiosClient.post(cartApi.ADD_TO_CART, { ...product });
    },
    getCart: () => {
        return axiosClient.get(cartApi.GET_CART);
    },
    removeFromCart: (cartItemId) => {
        return axiosClient.delete(`${cartApi.REMOVE_FROM_CART}/${cartItemId}`)
    },
    updateProductCartQuantity: (data) => {
        return axiosClient.put(`${cartApi.UPDATE_PRODUCT_CART_QUANTITY}/${data.cartItemId}`, { typeUpdate: data.typeUpdate })
    },

};

module.exports = CartService