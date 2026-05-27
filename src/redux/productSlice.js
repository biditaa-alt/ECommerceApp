import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../services/api';

const initialState = {
  items: [],
  status: 'idle',
  error: '',
};

export const loadProducts = createAsyncThunk('products/loadProducts', async () => {
  const products = await fetchProducts();
  return products;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadProducts.pending, state => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unable to load products.';
      });
  },
});

export const selectProductItems = state => state.products.items;
export const selectProductStatus = state => state.products.status;
export const selectProductError = state => state.products.error;

export default productSlice.reducer;
