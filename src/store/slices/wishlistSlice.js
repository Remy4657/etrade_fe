import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import WishlistService from "@/services/wishlist.service"
import { logout } from "./authSlice";


export const getWishlistApi = createAsyncThunk(
    "wishlist/getAll",
    async (_, thunkAPI) => {
        try {
            const res = await WishlistService.getWishlist();
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);

        }
    }
)
export const addToWishlistApi = createAsyncThunk(
    "wishlist/add",
    async (productId, thunkAPI) => {
        try {
            const res = await WishlistService.addToWishlist(productId);
            return res.data;
        } catch (err) {
            console.log(err)

        }
    }
)

export const removeFromWishlistApi = createAsyncThunk(
    "wishlist/add",
    async (productId, thunkAPI) => {
        try {
            const res = await WishlistService.removeFromWishlist(productId);
            return res.data;
        } catch (err) {
            console.log(err)

        }
    }
)

const wishlistSlice = createSlice({
    name: 'wishlists',
    initialState: {
        isLoading: false,
        wishlistItems: [],
        wishListQuantity: 0,

    },
    reducers: {
        addToWishlist(state, action) {
            const ItemIndex = state.wishlistItems.findIndex((item) => item.id === action.payload.id);
            if (ItemIndex >= 0) {
                Swal.fire({
                    title: action.payload.title,
                    text: 'Đã thêm vào sản phẩm yêu thích',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                })
            } else {
                state.wishlistItems.push(action.payload);
                state.wishListQuantity += 1;
                Swal.fire({
                    title: action.payload.title,
                    text: 'Đã thêm vào sản phẩm yêu thích',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                })
            }
        },
        removeWishlistItem(state, action) {
            const filteredWishlistItem = state.wishlistItems.filter((wishlistItem) => wishlistItem.id !== action.payload.id);
            state.wishlistItems = filteredWishlistItem;
            state.wishListQuantity = state.wishlistItems.length;
        },
    },
    extraReducers: (builder) => {

        builder.addCase(getWishlistApi.fulfilled, (state, action) => {
            state.wishlistItems = action?.payload ?? [];
            state.wishListQuantity = state.wishlistItems.length;

        });
        builder.addCase(logout.fulfilled, (state) => {
            state.wishlistItems = []
            state.wishListQuantity = 0
        })

    }
});

export const { addToWishlist, removeWishlistItem } = wishlistSlice.actions;

export default wishlistSlice.reducer;



