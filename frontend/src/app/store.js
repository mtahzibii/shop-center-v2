import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import cartReducer from '../features/carts/cartSlice';
import userReducer from '../features/users/userSlice';
import orderReducer from '../features/orders/orderSlice';
export const store = configureStore({
 reducer: {
  order: orderReducer,
  product: productReducer,
  cart: cartReducer,
  user: userReducer,
 },
});
