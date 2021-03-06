import { combineReducers } from 'redux';
import products from './reducers/products';
import cart from './reducers/cart';
import orders from './reducers/orders';

export default combineReducers({
  products,
  cart,
  orders,
});
