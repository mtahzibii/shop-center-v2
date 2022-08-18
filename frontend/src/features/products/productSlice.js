import productService from './productService';
import { createAsyncThunk, createSlice, isAsyncThunkAction } from '@reduxjs/toolkit';

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

// Update product
export const updateProduct = createAsyncThunk(
 'product/updateProduct',
 async (productData, thunkAPI) => {
  try {
   const token = thunkAPI.getState().user.user.token;
   return await productService.updateProductSpec(productData, token);
  } catch (error) {
   const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

   return thunkAPI.rejectWithValue(message);
  }
 }
);

// Create a new product
export const createProduct = createAsyncThunk(
 'product/createProduct',
 async (productData, thunkAPI) => {
  try {
   const token = thunkAPI.getState().user.user.token;
   return await productService.createNewProduct(productData, token);
  } catch (error) {
   const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

   return thunkAPI.rejectWithValue(message);
  }
 }
);

// Delete a product by admin
export const deleteProduct = createAsyncThunk(
 'products/deleteProduct',
 async (productId, thunkAPI) => {
  try {
   const token = thunkAPI.getState().user.user.token;
   return await productService.deleteSingleProduct(productId, token);
  } catch (error) {
   const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

   return thunkAPI.rejectWithValue(message);
  }
 }
);

// Search product(s)
export const searchProducts = createAsyncThunk(
 'products/searchProducts',
 async (keyword, thunkAPI) => {
  try {
   return await productService.searchProductsByUsers(keyword);
  } catch (error) {
   const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

   return thunkAPI.rejectWithValue(message);
  }
 }
);

const productSlice = createSlice({
 name: 'product',
 initialState,
 reducers: {
  metaReset: (state) => {
   state.isLoading = false;
   state.isError = false;
   state.isSuccess = false;
   state.message = '';
  },
  reset: (state) => {
   state.product = {};
  },
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
   })
   .addCase(updateProduct.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(updateProduct.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isError = false;
    state.isSuccess = true;
    state.product = action.payload;
   })
   .addCase(updateProduct.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.isSuccess = false;
    state.message = action.payload;
   })
   .addCase(createProduct.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(createProduct.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isError = false;
    state.isSuccess = true;
    state.product = action.payload;
   })
   .addCase(createProduct.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.isSuccess = false;
    state.message = action.payload;
   })
   .addCase(deleteProduct.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(deleteProduct.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.product = action.payload;
   })
   .addCase(deleteProduct.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.isSuccess = false;
    state.message = action.payload;
   })
   .addCase(searchProducts.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(searchProducts.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.products = action.payload;
   })
   .addCase(searchProducts.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.isSuccess = false;
    state.message = action.payload;
   }),
});

export const { reset, metaReset } = productSlice.actions;
export default productSlice.reducer;
