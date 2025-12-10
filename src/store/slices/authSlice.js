import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserLists } from "@/data/Users";
import AuthService from "@/services/auth.service"

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (data) => {
        console.log("data login: ", data)
        const res = await AuthService.login(data)
        console.log("res login: ", res)
    }
);
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: false,
        userData: {},
    },
    reducers: {
        logIn(state, action) {
            //const findUser = UserLists.filter(user => user.email === action.payload);
            console.log("action.payload: ", action.payload)
            state.userData = { name: "dat", age: "24" }
            state.login = true;

            // if (findUser.length) {
            //     state.userData = findUser[0];
            //     state.login = true;
            // }
        }
    }
});

export const { logIn } = authSlice.actions;

export default authSlice.reducer;



