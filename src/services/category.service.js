import axiosClient from "@/utils/axios";
import { categoryApi } from "@/api/api";

const CategoryService = {
    getCategoryAll: async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${categoryApi.GET_CATEGORY_ALL}`, {
                next: {
                    revalidate: 24 * 60 * 60
                }
            });
            if (!res.ok) {
                throw new Error("Lỗi khi lấy danh mục sản phẩm");
            }
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

};

module.exports = CategoryService