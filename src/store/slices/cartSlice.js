import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CartService from "@/services/cart.service"

import CheckoutService from "@/services/checkout.service"
import { calculateTotalAmount, calculateTotalQuantity } from "@/utils";
import { logout } from "./authSlice";


export const addToCartAPI = createAsyncThunk(
    "cart/addToCartAPI",
    async (product, thunkAPI) => {
        try {
            const res = await CartService.addToCart(product)
            // update cart in redux (để update id để làm key trong MiniCart compponent)
            thunkAPI.dispatch(getCurrentCart());
            return res.data;
        } catch (error) {
            //  Lấy message từ error object
            const errorMessage = error.response?.data || "Error system";
            return thunkAPI.rejectWithValue(errorMessage);

        }
    }
);
export const removeFromCartAPI = createAsyncThunk(
    "cart/removeFromCartAPI",
    async (cartItemId, { rejectWithValue }) => {
        try {
            const res = await CartService.removeFromCart(cartItemId)
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Error system"
            );
        }
    }
);
export const getCurrentCart = createAsyncThunk(
    "cart/getCurrentCart",
    async (_, thunkAPI) => {
        try {
            const res = await CartService.getCurrentCart();
            return res.data;
        } catch (err) {
            console.log(err)
            // action.payload chính là object trả về trong rejectWithValue
            return thunkAPI.rejectWithValue(err.data);
        }
    }
);

export const updateProductCartQuantity = createAsyncThunk(
    "cart/updateProductCartQuantity",
    async (data, thunkAPI) => {
        try {
            const res = await CartService.updateProductCartQuantity(data);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);
// checkout
export const checkoutApi = createAsyncThunk(
    "order/checkoutApi",
    async (data, thunkAPI) => {
        try {
            const res = await CheckoutService.checkout(data);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);
const cartSlice = createSlice({
    name: 'products',
    initialState: {
        isLoading: false,

        cartItems: [],
        cartQuantityTotal: 0,
        cartTotalAmount: 0,

        orderItems: []
    },
    reducers: {
        addToCart(state, action) {
            const ItemIndex = state.cartItems.findIndex((item) =>
                item.productId === action.payload.productId &&
                item.productColor === action.payload.productColor &&
                item.productSize === action.payload.productSize);
            if (ItemIndex >= 0) {
                state.cartItems[ItemIndex].cartQuantity += action.payload.cartQuantity ?? 1;
                state.cartQuantityTotal += action.payload.cartQuantity ?? 1
                state.isMinicartOpen = true;
            } else {
                const tempProduct = {
                    productId: action.payload.productId,
                    title: action.payload.title,
                    thumbnail: action.payload.thumbnail,
                    salePrice: action.payload.salePrice ?? 0,
                    price: action.payload.price,
                    productType: action.payload.productType,
                    cartQuantity: action.payload.cartQuantity ?? 1,
                    productSize: action.payload.productSize ?? "",
                    productColor: action.payload.productColor ?? "",
                }
                state.cartItems.push(tempProduct);
                state.cartQuantityTotal += action.payload.cartQuantity ?? 1;
                state.isMinicartOpen = true;
            }
            state.cartTotalAmount = calculateTotalAmount(state.cartItems);
        },
        removeCartItem(state, action) {

            const filteredCartItem = state.cartItems.filter((item) =>
                item.id !== action.payload.id);
            const filteredItemQuantity = filteredCartItem?.map((item) => {
                return { qty: item.cartQuantity, price: item.salePrice }
            })
            state.cartItems = filteredCartItem;
            state.cartQuantityTotal = filteredItemQuantity.reduce((sum, item) => sum + item.qty, 0);
            state.cartTotalAmount = filteredItemQuantity.reduce((sum, item) => sum + item.qty * item.price, 0);
        },
        cartQuantityIncrease(state, action) {
            const findItem = state.cartItems.findIndex((item) => item.id === action.payload.id);
            state.cartItems[findItem].cartQuantity += 1;
            state.cartTotalAmount = calculateTotalAmount(state.cartItems);
            state.cartQuantityTotal = calculateTotalQuantity(state.cartItems);
        },
        cartQuantityDecrease(state, action) {
            const findItem = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (state.cartItems[findItem].cartQuantity > 1) {
                state.cartItems[findItem].cartQuantity -= 1;
            }
            state.cartTotalAmount = calculateTotalAmount(state.cartItems);
            state.cartQuantityTotal = calculateTotalQuantity(state.cartItems);

        },
        cartClear(state, action) {
            state.cartItems = [];
            state.cartQuantityTotal = 0;
        },
        updateCartAmount(state, action) {
            state.cartTotalAmount = calculateTotalAmount(state.cartItems);
            state.cartQuantityTotal = calculateTotalQuantity(state.cartItems);
        },

        miniCartHandler(state, action) {
            state.isMinicartOpen = action.payload;
            if (state.quickView === true) {
                state.quickView = false;
            }
        },
        addToOrder(state, action) {
            state.orderItems.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentCart.fulfilled, (state, action) => {
            state.cartItems = action?.payload?.items ?? [];
            state.cartQuantityTotal = action?.payload?.cartQuantityTotal ?? 0;
            state.cartTotalAmount = action?.payload?.cartTotalAmount ?? 0;

        });

        builder.addCase(logout.fulfilled, (state) => {
            state.cartItems = []
            state.cartQuantityTotal = 0
            state.cartTotalAmount = 0
            state.wishlistItems = []
        })


    }
});

export const { addToCart, removeCartItem, cartQuantityIncrease, cartQuantityDecrease, cartClear, updateCartAmount, miniCartHandler, addToOrder } = cartSlice.actions;

export default cartSlice.reducer;



