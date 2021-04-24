import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavOpt from './NavOptions';
//screens
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen/CartScreen';
//screens options
import { options as productsOverviewOptions } from '../screens/shop/ProductsOverviewScreen/options';
import { options as productDetailsOptions } from '../screens/shop/ProductDetailsScreen/options';
import { options as cartOptions } from '../screens/shop/CartScreen/options';

const ProductsStackNavigator = (props) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Products"
      screenOptions={NavOpt.default}
    >
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productsOverviewOptions}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={productDetailsOptions}
      />

      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={cartOptions}
      />
    </Stack.Navigator>
  );
};

export default ProductsStackNavigator;
