import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserLists } from "@/data/Users";
import AuthService from "@/services/auth.service"

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (data, { rejectWithValue }) => {
        try {
            const res = await AuthService.login(data);
            console.log("[res data] login: ", res)
            return res.data?.data; // ⚠️ BẮT BUỘC return
        } catch (err) {
            return rejectWithValue(
                err.response?.data || "Login failed"
            );
        }
    }
);
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: false,
        userData: {},
        isLoading: false,
        isError: null,
    },
    reducers: {
        logout(state) {
            state.login = false;
            state.userData = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // pending
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })

            // fulfilled
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("action.payload: ", action.payload)
                state.isLoading = false;
                state.login = true;
                state.userData = action.payload;
            })

            // rejected
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.login = false;
                state.isError = action.payload;
            });
    },
});

//export const { logIn } = authSlice.actions;

export default authSlice.reducer;



