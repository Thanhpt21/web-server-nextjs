
// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./features/cartSlide";
import loadingReducer from "./features/loadingSlice";
import configReducer from "./features/configSlice";
import userReducer from "./features/userSlice";
import productReducer from "./features/productSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    loading: loadingReducer,
    config: configReducer,
    user: userReducer,
    product: productReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Để tương thích với thunk
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
