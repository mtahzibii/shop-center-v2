import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from './orderService';

const initialState = {
 orders: [],
 order: {},
 isLoading: false,
 isError: false,
 isSuccess: false,
 message: '',
};

// Set (add) new order to database
export const setOrder = createAsyncThunk(
 'orders/setOrder',
 async (orderDetails, thunkAPI) => {
  try {
   const token = thunkAPI.getState().user.user.token;
   const temp = await orderService.setOrdertoDB(orderDetails, token);
   console.log(temp);
   return temp;
  } catch (error) {
   const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

   return thunkAPI.rejectWithValue(message);
  }
 }
);

// Get an order from database (getOrderReducer)
export const getOrder = createAsyncThunk(
 'orders/getOrder',
 async (orderId, thunkAPI) => {
  try {
   const token = thunkAPI.getState().user.user.token;
   const order = await orderService.getOrderFromDB(orderId, token);

   return order;
  } catch (error) {
   const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

   return thunkAPI.rejectWithValue(message);
  }
 }
);

// Get user logged in orders
export const getOrders = createAsyncThunk(
 'orders/getOrders',
 async (_, thunkAPI) => {
  try {
   const token = thunkAPI.getState().user.user.token;
   const myOrders = await orderService.getMyOrdersFromDB(token);
   return myOrders;
  } catch (error) {
   const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

   return thunkAPI.rejectWithValue(message);
  }
 }
);

// Update order by payment
const updateOrderByPayment = createAsyncThunk(
 'orders/payment',
 async (paymentResult, orderId, thunkAPI) => {
  try {
   const token = thunkAPI.getState().user.user.token;
   return await orderService.orderPay(paymentResult, orderId, token);
  } catch (error) {
   const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

   return thunkAPI.rejectWithValue(message);
  }
 }
);

export const orderSlice = createSlice({
 name: 'order',
 initialState,
 reducers: {
  reset: (state) => {
   state.isLoading = false;
   state.isError = false;
   state.isSuccess = false;
   state.message = '';
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(setOrder.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(setOrder.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.order = action.payload;
   })
   .addCase(setOrder.rejected, (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = true;
    state.message = action.payload;
   })
   .addCase(getOrder.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(getOrder.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.order = action.payload;
   })
   .addCase(getOrder.rejected, (state, action) => {
    state.isLoading = false;
    state.order = null;
    state.isError = true;
    state.message = action.payload;
   })
   .addCase(getOrders.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(getOrders.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.orders = action.payload;
   })
   .addCase(getOrders.rejected, (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = true;
    state.message = action.payload;
   })
   .addCase(updateOrderByPayment.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(updateOrderByPayment.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.orders = action.payload;
   })
   .addCase(updateOrderByPayment.rejected, (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = true;
    state.message = action.payload;
   });
 },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
