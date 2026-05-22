import axios from "axios";
import { getSession } from "next-auth/react";
import authService from "@/services/auth.service";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
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
        const originalRequest = error.config;

        console.log("originalRequest.url: ", originalRequest.url);
        // những api không cần check token như signin, signup, refresh thì không cần gọi refresh token nữa vì nếu gọi refresh token mà refresh token cũng hết hạn thì sẽ bị lỗi vòng lặp vô hạn nên cần check trước khi gọi refresh token
        if (
            originalRequest.url.includes("/auth/login") ||
            originalRequest.url.includes("/auth/register") ||
            originalRequest.url.includes("/auth/refresh")

        ) {
            return Promise.reject(error);
        }
        // if (
        //     originalRequest.url.includes("/auth/refresh")
        // ) {
        // toast.error("Hết phiên đăng nhập, vui lòng đăng nhập lại");
        // await authService.logout(); // sign out ở server
        // await signOut({ redirect: false }) // sign out ở client (xóa session cookie),
        // window.location.href = "/sign-in";
        //     return Promise.reject(error);
        // }

        const status = error.response?.status;
        // const message = error.response?.data?.message || "Có lỗi xảy ra";

        switch (status) {
            case 403:
                originalRequest._retryCount = originalRequest._retryCount || 0;
                console.log("originalRequest._retryCount: ", originalRequest._retryCount);

                if (originalRequest._retryCount < 1) {
                    originalRequest._retryCount += 1;
                    try {
                        await authService.refreshToken();
                        return axiosClient(originalRequest); // retry lại request cũ với access token mới
                    } catch (error) {
                        console.log("add cart: ", error);
                        await authService.logout(); // sign out ở server
                        await signOut({ redirect: false }) // sign out ở client (xóa session cookie),
                        throw new Error("Hết phiên đăng nhập, vui lòng đăng nhập lại");

                    }
                }
        }
        return Promise.reject(error);
    }
);
export default axiosClient;
