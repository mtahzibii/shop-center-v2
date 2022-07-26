import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import cartReducer from '../features/carts/cartSlice';
import userReducer from '../features/users/userSlice';

export const store = configureStore({
 reducer: {
  product: productReducer,
  cart: cartReducer,
  user: userReducer,
 },
});
