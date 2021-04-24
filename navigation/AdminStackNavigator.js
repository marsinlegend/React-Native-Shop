import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavOpt from './NavOptions';
//screens
import UserProductsScreen from '../screens/user/UserProductsScreen/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductsScreen/EditProductScreen';
//screens options
import { options as userProductsOptions } from '../screens/user/UserProductsScreen/options';
import { options as editProductsOptions } from '../screens/user/EditProductsScreen/options';

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
        options={userProductsOptions}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductsOptions}
      />
    </Stack.Navigator>
  );
};

export default AdminStackNavigator;
