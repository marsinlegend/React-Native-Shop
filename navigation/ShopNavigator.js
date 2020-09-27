import React from 'react';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen/CartScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton/HeaderButton';

const ProductsNavigator = (props) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={({ navigation, route }) => {
          return {
            title: 'Products Overview',
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
              fontFamily: 'Fonts_700',
            },
          };
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
              fontFamily: 'Fonts_700',
            },
          };
        }}
      />

      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={({ navigation, route }) => {
          return {
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
              fontFamily: 'Fonts_700',
            },
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default ProductsNavigator;
