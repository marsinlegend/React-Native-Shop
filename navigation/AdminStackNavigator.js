import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserProductsScreen from '../screens/user/UserProductsScreen/UserProductsScreen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton/HeaderButton';
import { Platform } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import NavOpt from './NavOptions';

import EditProductScreen from '../screens/user/EditProductsScreen/EditProductScreen';

const AdminStackNavigator = (props) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Admin"
      screenOptions={NavOpt.default}
    >
      <Stack.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={({ navigation, route }) => {
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
                    Platform.OS === 'android'
                      ? 'md-create'
                      : 'ios-create'
                  }
                  onPress={() => {
                    navigation.navigate('EditProduct');
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={({ navigation, route }) => {
          const submitFn = route.params?.submit;

          return {
            title: route.params?.productId
              ? 'Edit Product'
              : 'Add Product',
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Save"
                  iconName={
                    Platform.OS === 'android'
                      ? 'md-checkmark'
                      : 'ios-checkmark'
                  }
                  onPress={submitFn}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default AdminStackNavigator;
