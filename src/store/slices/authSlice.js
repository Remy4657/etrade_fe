import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "@/services/auth.service"
import { signOut } from "next-auth/react"

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (data, { rejectWithValue }) => {
        try {
            const res = await authService.login(data);
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data || "Login failed"
            );
        }
    }
);
export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout(); // sign out ở server
            await signOut({ redirect: false }) // sign out ở client (xóa session cookie),
            return;
        } catch (err) {
            return rejectWithValue("Logout err: ", err);
        }
    }
);
export const getMe = createAsyncThunk(
    "auth/getMe",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const res = await authService.me();

            return res.data;
        } catch (err) {
            return rejectWithValue(err);
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
    extraReducers: (builder) => {
        //login
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.login = true;
                state.userData = action.payload.data;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.login = false;
                state.isError = action.payload;
            });
        // logout
        builder
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.login = false;
                state.userData = null;
            })
            .addCase(logout.rejected, (state) => {
                state.isLoading = false;
            });
        // getMe
        builder
            .addCase(getMe.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.login = true;
                state.userData = action.payload;
            })
            .addCase(getMe.rejected, (state) => {
                state.isLoading = false;
                state.login = false;
                state.userData = null;
            })

    },
});

//export const { logIn } = authSlice.actions;

export default authSlice.reducer;



