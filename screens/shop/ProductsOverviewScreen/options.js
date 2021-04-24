import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../../components/UI/HeaderButton/HeaderButton';
import { Platform } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import React from 'react';

export const options = ({ navigation, route }) => {
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
};
