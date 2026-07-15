import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "@/services/product.service"
import CategoryService from "@/services/category.service"
import { getWishlistApi } from "./wishlistSlice";


export const fetchAllProductAPI = createAsyncThunk(
    "product/fetchAllProductAPI",
    async (_, thunkAPI) => {
        try {
            const res = await ProductService.getProductAll()
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Error system"
            );
        }
    }
);
export const fetchProducBestsellerAPI = createAsyncThunk(
    "product/fetchProducBestsellerAPI",
    async (_, thunkAPI) => {
        try {
            const res = await ProductService.getProductBestseller()
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Error system"
            );
        }
    }
);
export const fetchProducNewestAPI = createAsyncThunk(
    "product/fetchProducNewestAPI",
    async (_, thunkAPI) => {
        try {
            const res = await ProductService.getProductNewest()
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Error system"
            );
        }
    }
);
export const fetchAllCategoryAPI = createAsyncThunk(
    "product/fetchAllCategoryAPI",
    async (_, thunkAPI) => {
        try {
            const res = await CategoryService.getCategoryAll()
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Error system"
            );
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        isLoading: false,
        listProducts: [],
        listProductBestSeller: [],
        listProductNewest: [],
        listCategory: [],

        cartItems: [],
        cartQuantityTotal: 0,
        cartTotalAmount: 0,

        quickView: false,
        quickViewItems: null,
        isMinicartOpen: false,
        orderItems: []
    },
    reducers: {
        addToQuickView(state, action) {
            state.quickView = action.payload.quickView;
            state.quickViewItems = action.payload.viewItem;
        },

    },
    extraReducers: (builder) => {

        builder.addCase(getWishlistApi.fulfilled, (state, action) => {
            state.wishlistItems = action?.payload ?? [];
            state.wishListQuantity = state.wishlistItems.length;


        });

        // all product
        builder
            .addCase(fetchAllProductAPI.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAllProductAPI.fulfilled, (state, action) => {
                state.listProducts = action.payload
                state.isLoading = false
            })
            .addCase(fetchAllProductAPI.rejected, (state) => {
                state.isLoading = false
            })
        // product newest
        builder
            .addCase(fetchProducNewestAPI.pending, (state) => {
            })
            .addCase(fetchProducNewestAPI.fulfilled, (state, action) => {
                state.listProductNewest = action.payload
            })
            .addCase(fetchProducNewestAPI.rejected, (state) => {
            })
        // product best seller
        builder
            .addCase(fetchProducBestsellerAPI.pending, (state) => {
            })
            .addCase(fetchProducBestsellerAPI.fulfilled, (state, action) => {
                state.listProductBestSeller = action.payload
            })
            .addCase(fetchProducBestsellerAPI.rejected, (state) => {
            })
        // product category
        builder
            .addCase(fetchAllCategoryAPI.pending, (state) => {
            })
            .addCase(fetchAllCategoryAPI.fulfilled, (state, action) => {
                state.listCategory = action.payload
            })
            .addCase(fetchAllCategoryAPI.rejected, (state) => {
            })

    }
});

export const { addToQuickView } = productSlice.actions;

export default productSlice.reducer;



