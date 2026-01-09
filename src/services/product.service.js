import axiosClient from "@/utils/axios";
import { productApi } from "@/api/api";

const ProductService = {
    getProductAll: () => {
        return axiosClient.get(productApi.GET_PRODUCT_ALL);
    },
    getProductBestseller: () => {
        return axiosClient.get(productApi.GET_PRODUCT_BESTSELLER);
    },
    getProductNewest: () => {
        return axiosClient.get(productApi.GET_PRODUCT_NEWEST);
    },
    getProductCategory: (categoryName) => {
        return axiosClient.get(`${productApi.GET_PRODUCT_CATEGORY}/${categoryName}`);
    },
    getDetailProduct: (idProduct) => {
        return axiosClient.get(`${productApi.GET_DETAIL_PRODUCT}/${idProduct}`);
    }

};

module.exports = ProductService