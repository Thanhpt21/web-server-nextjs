import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    productId: null,
  },
  reducers: {
    setProductId(state, action) {
      state.productId = action.payload;
    },
  },
});

export const { setProductId } = productSlice.actions;
export default productSlice.reducer;