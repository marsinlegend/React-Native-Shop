import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrdersScreen from '../screens/shop/OrdersScreen/OrdersScreen';

const OrdersStackNavigator = (props) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={({ navigation, route }) => {
          return {
            title: 'Orders',
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default OrdersStackNavigator;
