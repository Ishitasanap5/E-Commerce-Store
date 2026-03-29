import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  // Enable DevTools only in development
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;