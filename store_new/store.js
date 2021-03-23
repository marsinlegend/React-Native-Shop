import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './shop/ProductsSlice';
// import { ordersSlice } from './shop/OrdersSlice';
// import { cartSlice } from './shop/CartSlice';

export default configureStore({
  reducer: {
    products: productsSlice.reducer,
    // orders: ordersSlice.reducer,
    // cart: cartSlice.reducer,
  },
  devTools: true,
});
