import axios from "axios";
import { getSession } from "next-auth/react";

const axiosClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});
axiosClient.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        if (session?.access_token) {
            config.headers.Authorization = `Bearer ${session.access_token}`;
        }

        return config;
    },
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject({
            status: error.response?.status || 500,
            data: error.response?.data || { message: "Server error" },
        });
    }
);
export default axiosClient;
