import axiosClient from "@/utils/axios";
import { authApi } from "@/api/api";

const AuthService = {
    register: (data) => {
        console.log("data register: ", data)
        return axiosClient.post(authApi.REGISTER, { ...data });
    }



};

module.exports = AuthService