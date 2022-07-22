import productService from './productService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
 products: [],
 product: {},
 isError: false,
 isSuccess: false,
 isLoading: false,
 message: '',
};

// Fetch all products
export const fetchProducts = createAsyncThunk(
 'products/getAll',
 async (_, thunkAPI) => {
  try {
   return await productService.getProducts();
  } catch (error) {
   const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

   return thunkAPI.rejectWithValue(message);
  }
 }
);

// Fetch single product
export const fetchProduct = createAsyncThunk(
 'products/getProduct',
 async (productId, thunkAPI) => {
  try {
   return await productService.getProduct(productId);
  } catch (error) {
   const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

   return thunkAPI.rejectWithValue(message);
  }
 }
);

// Reset meta states (loading, error, succes and mesaage);
const state = () => {
 initialState.isError = false;
 initialState.isSuccess = false;
 initialState.message = '';
 initialState.isLoading = false;
};

const productSlice = createSlice({
 name: 'product',
 initialState,
 reducers: {
  reset: (state) => initialState,
 },
 extraReducers: (builder) =>
  builder
   .addCase(fetchProducts.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(fetchProducts.fulfilled, (state, action) => {
    state.isSuccess = true;
    state.isError = false;
    state.isLoading = false;
    state.products = action.payload;
   })
   .addCase(fetchProducts.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.isSuccess = false;
    state.message = action.payload;
   })
   .addCase(fetchProduct.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(fetchProduct.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isError = false;
    state.isSuccess = true;
    state.product = action.payload;
   })
   .addCase(fetchProduct.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.isSuccess = false;
    state.message = action.payload;
   }),
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
