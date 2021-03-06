export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  product,
});
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  pid: productId,
});
