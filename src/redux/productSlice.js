import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
  },
  reducers: {
    getProducts(state, action) {
      state.items = action.payload;
    },
  },
});

export const { getProducts } = productSlice.actions;
export default productSlice.reducer;
