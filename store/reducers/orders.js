import { ADD_ORDER } from '../actions/orders';
import Order from '../../models/Order';
import uuid from 'uuid-random';

const INITIAL_STATE = {
  orders: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ORDER: {
      const newOrder = new Order(
        uuid(),
        action.orderData.items,
        action.orderData.amount,
        new Date(),
      );

      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    }
  }
  return state;
};
