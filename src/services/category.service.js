import axiosClient from "@/utils/axios";
import { categoryApi } from "@/api/api";

const CategoryService = {
    getCategoryAll: () => {
        return axiosClient.get(categoryApi.GET_CATEGORY_ALL);
    }

};

module.exports = CategoryService