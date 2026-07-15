import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import authSlice from "./slices/authSlice";
import menuSlice from "./slices/menuSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "./storage";
import wishlistSlice from "./slices/wishlistSlice";



// 2️. Cấu hình persist

const productPersistConfig = {
    key: "product",
    storage,
    whitelist: ["listProducts"], //  CHỈ LƯU listProducts
};

// 3️. Persist reducer
//const persistedReducer = persistReducer(persistConfig, rootReducer);
export const persistedProductReducer = persistReducer(
    productPersistConfig,
    productSlice
);
// 1️. Combine reducer (GIỮ ĐÚNG key bạn đang dùng)
// const rootReducer = combineReducers({
//     product: productSlice,
//     auth: authSlice,
//     menu: menuSlice,
// });
const rootReducer = combineReducers({
    product: persistedProductReducer, //  product đã được persist riêng
    auth: authSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    menu: menuSlice,
});
// 4️. Configure store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
                ignoredActionPaths: ["meta.config", "meta.request"],
            },
        }),
});

// 5️. Persistor
export const persistor = persistStore(store);
