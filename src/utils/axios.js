import axios from "axios";
import { getSession } from "next-auth/react";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
axiosClient.interceptors.request.use(
    async (config) => { // Trước khi gửi request, thêm token vào header nếu có
        const session = await getSession();
        if (session?.access_token) {
            config.headers.Authorization = `Bearer ${session.access_token}`;
        }

        return config;
    },
    (error) => { // Nếu có lỗi trong quá trình gửi request, trả về lỗi đó
        return Promise.reject({
            status: error.response?.status || 500,
            data: error.response?.data || { message: "Server error" },
        });
    }
);
axiosClient.interceptors.response.use(
    (res) => res,
    async (error) => {
        const status = error.response?.status;
        // const message = error.response?.data?.message || "Có lỗi xảy ra";

        // switch (status) {
        //     case 403:
        //         try {
        //             await store.dispatch(logout());
        //             toast.error("Hết phiên đăng nhập, vui lòng đăng nhập lại");
        //         } catch (error) {
        //             toast.error("Có lỗi xảy ra khi xóa sản phẩm, vui lòng thử lạii");
        //             return
        //         }
        // }
        return Promise.reject(error);
    }
);
export default axiosClient;
