import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.resolve({
            status: error.response?.status || 500,
            data: error.response?.data || { message: "Server error" },
        });
    }
);
export default axiosClient;
