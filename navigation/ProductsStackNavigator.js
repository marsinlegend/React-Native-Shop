import React from 'react';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen/CartScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton/HeaderButton';
import { DrawerActions } from '@react-navigation/native';
import NavOpt from './NavOptions';

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
        options={({ navigation, route }) => {
          return {
            title: 'All Products',
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Menu"
                  iconName={
                    Platform.OS === 'android' ? 'md-menu' : 'ios-menu'
                  }
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }}
                />
              </HeaderButtons>
            ),
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Cart"
                  iconName={
                    Platform.OS === 'android' ? 'md-cart' : 'ios-cart'
                  }
                  onPress={() => {
                    navigation.navigate('Cart');
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={({ navigation, route }) => {
          return {
            title: route.params.productTitle,
          };
        }}
      />

      <Stack.Screen name="Cart" component={CartScreen} />

      <Stack.Screen
        name="Orders"
        component={CartScreen}
        options={({ navigation, route }) => {
          return {
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Menu"
                  iconName={
                    Platform.OS === 'android' ? 'md-menu' : 'ios-menu'
                  }
                  onPress={() => {
                    navigation.openDrawer();
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default ProductsStackNavigator;
