import axiosClient from "@/utils/axios";
import { authApi } from "@/api/api";


const AuthService = {
    register: (data) => {
        return axiosClient.post(authApi.REGISTER, { ...data });
    },
    login: (data) => {
        console.log("[data login]:", data)
        return axiosClient.post(authApi.LOGIN, { ...data });
    }
};

module.exports = AuthService