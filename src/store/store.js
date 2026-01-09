import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
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

// 1️⃣ Combine reducer (GIỮ ĐÚNG key bạn đang dùng)
const rootReducer = combineReducers({
    productData: productSlice,
    auth: authSlice,
    menu: menuSlice,
});

// 2️⃣ Cấu hình persist
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["productData"],
    // 👆 chỉ persist product (chuẩn ecommerce)
    // auth thường nên dùng cookie
};

// 3️⃣ Persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ Configure store
export const store = configureStore({
    reducer: persistedReducer,
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
            },
        }),
});

// 5️⃣ Persistor
export const persistor = persistStore(store);
