import axiosClient from "@/utils/axios";
import { categoryApi, productApi } from "@/api/api";

const ProductService = {
    getProductAll: () => {
        return axiosClient.get(productApi.GET_PRODUCT_ALL);
    },
    getDetailProduct: (idProduct) => {
        return axiosClient.get(`${productApi.GET_DETAIL_PRODUCT}/${idProduct}`);
    }

};

module.exports = ProductService