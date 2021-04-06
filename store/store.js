import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './shop/ProductsSlice';
import { ordersSlice } from './shop/OrdersSlice';
import { cartSlice } from './shop/CartSlice';
import { authSlice } from './auth/authSlice';

export default configureStore({
  reducer: {
    products: productsSlice.reducer,
    orders: ordersSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
  },
  devTools: true,
});
