import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
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
      const totalAmount = state.totalAmount + prodPrice;

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
          totalAmount: totalAmount,
        };
      } else {
        const newCartItem = new CartItem(
          1,
          prodPrice,
          prodTitle,
          prodPrice,
        );
        console.log(state);
        return {
          ...state,
          items: {
            ...state.items,
            [addedProducts.id]: newCartItem,
          },
          totalAmount: totalAmount,
        };
      }
    }

    case REMOVE_FROM_CART: {
      const selectedProduct = state.items[action.pid];
      const currentQty = state.items[action.pid].quantity;
      const totalAmount =
        state.totalAmount - selectedProduct.productPrice;

      if (currentQty > 1) {
        return {
          ...state,
          items: {
            ...state.items,
            [action.pid]: new CartItem(
              selectedProduct.quantity - 1,
              selectedProduct.productPrice,
              selectedProduct.productTitle,
              selectedProduct.sum - selectedProduct.productPrice,
            ),
          },
          totalAmount: totalAmount,
        };
      } else {
        return {
          ...state,
          items: () => {
            const updatedItems = { ...state.items };
            delete updatedItems[action.pid];
            return updatedItems;
          },
          totalAmount: totalAmount,
        };
      }
    }
  }
  return state;
};
