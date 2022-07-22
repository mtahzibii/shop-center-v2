import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import cartReducer from '../features/carts/cartSlice';

export const store = configureStore({
 reducer: {
  product: productReducer,
  cart: cartReducer,
 },
});
