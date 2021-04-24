import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../../components/UI/HeaderButton/HeaderButton';
import { Platform } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import React from 'react';

export const options = ({ navigation, route }) => {
  return {
    title: 'User Products',
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
          title="Create"
          iconName={
            Platform.OS === 'android' ? 'md-create' : 'ios-create'
          }
          onPress={() => {
            navigation.navigate('EditProduct');
          }}
        />
      </HeaderButtons>
    ),
  };
};
