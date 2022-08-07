import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from './orderService';

const orderDetails = JSON.parse(localStorage.getItem('orderInfo'));

const initialState = {
 orderInfo: orderDetails ? orderDetails : {},
 isLoading: false,
 isError: false,
 isSuccess: false,
 message: '',
};

export const setOrder = createAsyncThunk(
 'orders/setOrder',
 async (orderDetails, thunkAPI) => {
  try {
   const token = thunkAPI.getState().user.user.token;
   return await orderService.setOrdertoDB(orderDetails, token);
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
  reset: (state) => initialState,
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
    state.orderInfo = action.payload;
   })
   .addCase(setOrder.rejected, (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = true;
    state.message = action.payload;
   });
 },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
