import axiosClient from "@/utils/axios";
import categoryApi from "@/api/category.api";

const CategoryService = {
    getCategoryAll: () => {
        return axiosClient.get(categoryApi.GET_CATEGORY_ALL);

    },
    getProductAll: () => {
        return axiosClient.get(categoryApi.GET_PRODUCT_ALL);

    }


};

module.exports = CategoryService