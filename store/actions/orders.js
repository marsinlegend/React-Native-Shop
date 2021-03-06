export const ADD_ORDER = 'ADD_ORDER';

export const addToCart = (cartItems, totalAmount) => ({
  type: ADD_ORDER,
  orderData: {
    items: cartItems,
    amount: totalAmount,
  },
});
