import axiosClient from "@/utils/axios";
import { productApi } from "@/api/api";

const ProductService = {
    getProductAll: async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${productApi.GET_PRODUCT_ALL}`, {
                next: {
                    revalidate: 24 * 60 * 60
                }
            });
            if (!res.ok) {
                throw new Error("Lỗi khi lấy danh sách sản phẩm");

            }
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }

    },
    getProductBestseller: async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${productApi.GET_PRODUCT_BESTSELLER}`, {
                next: {
                    revalidate: 24 * 60 * 60
                }
            });
            if (!res.ok) {
                throw new Error("Lỗi khi lấy danh sách sản phẩm bán chạy");

            }
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }
    },
    getProductNewest: async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${productApi.GET_PRODUCT_NEWEST}`, {
                next: {
                    revalidate: 24 * 60 * 60
                }
            });
            if (!res.ok) {
                throw new Error("Lỗi khi lấy danh sách sản phẩm mới nhất");
            }
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }
    },
    getProductCategory: async (categoryName) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${productApi.GET_PRODUCT_CATEGORY}/${categoryName}`, {
                next: {
                    revalidate: 24 * 60 * 60
                }
            });
            if (!res.ok) {
                throw new Error("Lỗi khi lấy danh sách sản phẩm liên quan");
            }
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }
    },
    getDetailProduct: async (idProduct) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${productApi.GET_DETAIL_PRODUCT}/${idProduct}`, {
                next: {
                    revalidate: 24 * 60 * 60
                }
            });
            if (!res.ok) {
                throw new Error("Lỗi khi lấy chi tiết sản phẩm");
            }
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

};

module.exports = ProductService