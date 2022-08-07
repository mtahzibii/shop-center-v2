import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartServices from './cartServices';

const cartItemsFromStorage = JSON.parse(localStorage.getItem('cartItems'));
const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
const paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'));

const initialState = {
 cartItems: cartItemsFromStorage ? cartItemsFromStorage : [],
 shippingAddress: shippingAddress ? shippingAddress : {},
 paymentMethod: paymentMethod ? paymentMethod : '',
 shippingPrice: '',
 taxPrice: '',
 totalPrice: '',
 message: '',
 isLoading: false,
};

// Add item(s) to cart
export const addToCart = createAsyncThunk('carts/addItems', (product, thunkAPI) => {
 try {
  return cartServices.addItemToCart(product);
 } catch (error) {
  const message =
   (error.response && error.response.data && error.response.data.message) ||
   error.message ||
   error.toString();

  return thunkAPI.rejectWithValue(message);
 }
});

// Remove item(s) from cart
export const removeFromCart = createAsyncThunk(
 'carts/removeItems',
 (productId, thunkAPI) => {
  try {
   return cartServices.removeItemFromCart(productId);
  } catch (error) {
   const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

   return thunkAPI.rejectWithValue(message);
  }
 }
);

export const cartSlice = createSlice({
 name: 'cart',
 initialState,
 reducers: {
  reset: (state) => initialState,
  orderPricingDetails: (state, action) => {
   state.shippingPrice = action.payload.shippingPrice;
   state.taxPrice = action.payload.taxPrice;
   state.totalPrice = action.payload.totalPrice;
  },
  updatePaymentMethod: (state, action) => {
   state.paymentMethod = action.payload;
  },
  setShippingAddress: (state, action) => {
   state.shippingAddress = action.payload;
  },
 },
 extraReducers: (builder) =>
  builder
   .addCase(addToCart.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(addToCart.fulfilled, (state, action) => {
    state.isLoading = false;
    state.cartItems = action.payload;
   })
   .addCase(addToCart.rejected, (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
   })
   .addCase(removeFromCart.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(removeFromCart.fulfilled, (state, action) => {
    state.isLoading = false;
    state.cartItems = action.payload;
   })
   .addCase(removeFromCart.rejected, (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
   }),
});

export const {
 reset,
 orderPricingDetails,
 updatePaymentMethod,
 setShippingAddress,
} = cartSlice.actions;
export default cartSlice.reducer;
