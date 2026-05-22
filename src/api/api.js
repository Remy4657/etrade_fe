export const categoryApi = {
    GET_CATEGORY_ALL: "/categories",
};
export const authApi = {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    GET_ME: "/auth/me",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh"
};
export const cartApi = {
    ADD_TO_CART: "/cart/add",
    GET_CART: "/cart/get-current",
    REMOVE_FROM_CART: "cart/remove-item",
    UPDATE_PRODUCT_CART_QUANTITY: "cart/update"

}
export const productApi = {
    GET_PRODUCT_ALL: "/products",
    GET_DETAIL_PRODUCT: "/product",
    GET_PRODUCT_CATEGORY: "/products",
    GET_PRODUCT_BESTSELLER: "/products/best-seller",
    GET_PRODUCT_NEWEST: "/products/newest"

};
export const shippingApi = {
    GET_SHIPPING_ALL: "/get-all-shipping",
};
export const paymentApi = {
    GET_PAYMENT_ALL: "/get-all-payment",
};
export const checkoutApi = {
    CHECKOUT: "/orders/checkout",
};
export const orderApi = {
    GET_ALL: "/orders",
    GET_DETAIL: "/orders",

};
