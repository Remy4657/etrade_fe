import axiosClient from "@/utils/axios";
import { authApi } from "@/api/api";

const authService = {
    register: (data) => {
        return axiosClient.post(authApi.REGISTER, { ...data });
    },
    login: (data) => {
        return axiosClient.post(authApi.LOGIN, { ...data });
    },
    me: () => {
        return axiosClient.get(authApi.GET_ME)
    },
    logout: () => {
        return axiosClient.post(authApi.LOGOUT)
    },
    refreshToken: () => {
        return axiosClient.post(authApi.REFRESH_TOKEN)
    }
};

module.exports = authService