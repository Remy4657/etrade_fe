import axios from "axios";
import { getSession } from "next-auth/react";
import authService from "@/services/auth.service";
import { signOut } from "next-auth/react";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
axiosClient.interceptors.request.use(
    async (config) => {
        // const session = await getSession();
        // if (session?.access_token) {
        //     config.headers.Authorization = `Bearer ${session.access_token}`;
        // }

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

        // những api không cần check token như signin, signup, refresh thì không cần gọi refresh token nữa vì nếu gọi refresh token mà refresh token cũng hết hạn thì sẽ bị lỗi vòng lặp vô hạn nên cần check trước khi gọi refresh token
        if (
            originalRequest.url.includes("/auth/login") ||
            originalRequest.url.includes("/auth/register") ||
            originalRequest.url.includes("/auth/refresh")
        ) {
            return Promise.reject(error);
        }
        const status = error.response?.status;

        switch (status) {
            case 403:
                originalRequest._retryCount = originalRequest._retryCount || 0;

                if (originalRequest._retryCount < 1) {
                    originalRequest._retryCount += 1;
                    try {
                        await authService.refreshToken();
                        return axiosClient(originalRequest); // retry lại request cũ với access token mới
                    } catch (error) {
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
