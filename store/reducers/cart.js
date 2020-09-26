import { ADD_TO_CART } from '../actions/cart';
import CartItem from '../../models/CartItem';

const INITIAL_STATE = {
  items: {},
  totalAmount: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const addedProducts = action.product;
      const prodPrice = addedProducts.price;
      const prodTitle = addedProducts.title;

      if (state.items[addedProducts.id]) {
        const updatedCartItem = new CartItem(
          state.items[addedProducts.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProducts.id].sum + prodPrice,
        );

        return {
          ...state,
          items: {
            ...state.items,
            [addedProducts.id]: updatedCartItem,
          },
          totalAmount: state.totalAmount + prodPrice,
        };
      } else {
        const newCartItem = new CartItem(
          1,
          prodPrice,
          prodTitle,
          prodPrice,
        );

        return {
          ...state,
          items: {
            ...state.items,
            [addedProducts.id]: newCartItem,
          },
          totalAmount: state.totalAmount + prodPrice,
        };
      }
    }
  }

  return state;
};
