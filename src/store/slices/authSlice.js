import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useRouter } from 'next/navigation';
import AuthService from "@/services/auth.service"

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (data, { rejectWithValue }) => {
        try {
            const res = await AuthService.login(data);
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data || "Login failed"
            );
        }
    }
);
export const getMe = createAsyncThunk(
    "auth/getMe",
    async (_, { rejectWithValue }) => {
        try {
            const res = await AuthService.me();
            console.log("[me] res: ", res)
            return res.data;
        } catch (err) {
            return rejectWithValue("Unauthenticated");
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
        //login
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("action.payload login: ", action.payload)
                state.isLoading = false;
                state.login = true;
                state.userData = action.payload.data;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.login = false;
                state.isError = action.payload;
            });
        // getMe
        builder
            .addCase(getMe.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                console.log("[me fulfilled] action.payload: ", action.payload)
                state.isLoading = false;
                state.login = true;
                state.userData = action.payload;
            })
            .addCase(getMe.rejected, (state) => {
                console.log("[me rejected] action.payload: ")
                state.isLoading = false;
                state.login = false;
                state.userData = null;
            })

    },
});

//export const { logIn } = authSlice.actions;

export default authSlice.reducer;



