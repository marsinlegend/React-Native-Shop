import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import CartItem from '../../models/CartItem';
import { ADD_ORDER } from '../actions/orders';
import { DELETE_PRODUCT } from '../actions/products';

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
      const currentQty = selectedProduct.quantity;
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
        const updatedItems = { ...state.items };
        delete updatedItems[action.pid];

        return {
          ...state,
          items: updatedItems,
          totalAmount: totalAmount,
        };
      }
    }

    case ADD_ORDER: {
      return INITIAL_STATE;
    }

    case DELETE_PRODUCT: {
      if (!state.items[action.pid]) {
        return state;
      }

      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid];

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
    }
  }
  return state;
};
