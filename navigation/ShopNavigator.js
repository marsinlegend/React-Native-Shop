import React from 'react';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen/ProductDetailsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';

const ProductsNavigator = (props) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={{
          title: 'Products Overview',
          headerStyle: {
            backgroundColor:
              Platform.OS === 'android' ? Colors.defaultPrimary : '',
          },
          headerTintColor:
            Platform.OS === 'android'
              ? Colors.textPrimary
              : Colors.darkPrimary,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'lato-bold',
          },
        }}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={({ navigation, route }) => {
          return {
            title: route.params.productTitle,
            headerStyle: {
              backgroundColor:
                Platform.OS === 'android'
                  ? Colors.defaultPrimary
                  : '',
            },
            headerTintColor:
              Platform.OS === 'android'
                ? Colors.textPrimary
                : Colors.darkPrimary,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'lato-bold',
            },
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default ProductsNavigator;
