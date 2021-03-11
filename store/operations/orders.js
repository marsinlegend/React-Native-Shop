import { ADD_ORDER } from '../actions/orders';

export const addOrder = (cartItems, totalAmount) => ({
  type: ADD_ORDER,
  orderData: {
    items: cartItems,
    amount: totalAmount,
  },
});
