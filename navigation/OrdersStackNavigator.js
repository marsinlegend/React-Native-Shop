import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrdersScreen from '../screens/shop/OrdersScreen/OrdersScreen';
import { options as ordersOptions } from '../screens/shop/OrdersScreen/options';

const OrdersStackNavigator = (props) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersOptions}
      />
    </Stack.Navigator>
  );
};

export default OrdersStackNavigator;
