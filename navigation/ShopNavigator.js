import React from 'react';
import ProductsOverview from '../screens/shop/ProductsOverviewScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';

const ProductsNavigator = (props) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products Overview"
        component={ProductsOverview}
        options={{
          headerStyle: {
            backgroundColor:
              Platform.OS === 'android' ? Colors.darkPrimary : '',
          },
          headerTintColor:
            Platform.OS === 'android'
              ? Colors.textPrimary
              : Colors.darkPrimary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ProductsNavigator;
