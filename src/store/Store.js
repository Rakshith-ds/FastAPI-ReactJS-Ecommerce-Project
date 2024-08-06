// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice";
import productSlice from "../redux/productSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productSlice,
  },
});

export default store;
