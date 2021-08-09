import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from './OrdersSlice';

const initialState = {
  items: {},
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const addedProd = action.payload;
      const productPrice = addedProd.price;
      const productTitle = addedProd.title;
      const pushToken = addedProd.ownerPushToken;
      const totalAmount = state.totalAmount + productPrice;

      if (state.items[addedProd.id]) {
        const updatedCartItem = {
          quantity: state.items[addedProd.id].quantity + 1,
          productPrice,
          productTitle,
          pushToken,
          sum: state.items[addedProd.id].sum + productPrice,
        };

        return {
          ...state,
          items: {
            ...state.items,
            [addedProd.id]: updatedCartItem,
          },
          totalAmount,
        };
      } else {
        const newCartItem = {
          quantity: 1,
          productPrice,
          productTitle,
          pushToken,
          sum: productPrice,
        };
        return {
          ...state,
          items: {
            ...state.items,
            [addedProd.id]: newCartItem,
          },
          totalAmount,
        };
      }
    },
    removeFromCart: (state, action) => {
      const {
        quantity,
        productPrice,
        productTitle,
        sum,
      } = state.items[action.payload];

      const currentQty = quantity;
      const totalAmount = state.totalAmount - productPrice;

      if (currentQty > 1) {
        return {
          ...state,
          items: {
            ...state.items,
            [action.payload]: {
              quantity: quantity - 1,
              productPrice,
              productTitle,
              sum: sum - productPrice,
            },
          },
          totalAmount,
        };
      } else {
        const updatedItems = { ...state.items };
        delete updatedItems[action.payload];

        return {
          ...state,
          items: updatedItems,
          totalAmount,
        };
      }
    },
  },
  extraReducers: {
    [createOrder.fulfilled]: () => {
      return initialState;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const cartSelector = (state) => state.cart;
