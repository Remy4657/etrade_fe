import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});
axiosClient.interceptors.response.use(
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
