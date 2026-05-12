import axiosClient from "@/utils/axios";
import { authApi } from "@/api/api";

const AuthService = {
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
    }
};

module.exports = AuthService