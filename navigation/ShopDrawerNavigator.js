import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import { useSelector } from 'react-redux';
import { authSelector } from '../store/auth/authSlice';
import LogoutButton from '../components/UI/LogoutButton/LogoutButton';
//screens
import AuthScreen from '../screens/user/AuthScreen/AuthScreen';
//stack navigators
import ProductsStackNavigator from './ProductsStackNavigator';
import OrdersStackNavigator from './OrdersStackNavigator';
import AdminStackNavigator from './AdminStackNavigator';

const ShopDrawerNavigator = (props) => {
  const Drawer = createDrawerNavigator();
  const { isLoggedIn } = useSelector(authSelector);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Shop"
        drawerContentOptions={{
          activeTintColor: Colors.defaultPrimary,
        }}
        drawerContent={(props) => (
          <DrawerContentScrollView>
            <DrawerItemList {...props} />
            {isLoggedIn && <LogoutButton {...props} />}
          </DrawerContentScrollView>
        )}
      >
        {!isLoggedIn ? (
          <Drawer.Screen name="Auth" component={AuthScreen} />
        ) : (
          <>
            <Drawer.Screen
              name="Products"
              component={ProductsStackNavigator}
              options={{
                drawerIcon: ({ focused, color }) => (
                  <Ionicons
                    name={
                      Platform.OS === 'android'
                        ? 'md-cart'
                        : 'ios-cart'
                    }
                    size={23}
                    color={focused ? Colors.defaultPrimary : color}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Orders"
              component={OrdersStackNavigator}
              options={{
                drawerIcon: ({ focused, color }) => (
                  <Ionicons
                    name={
                      Platform.OS === 'android'
                        ? 'md-list'
                        : 'ios-list'
                    }
                    size={23}
                    color={focused ? Colors.defaultPrimary : color}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="UserProducts"
              component={AdminStackNavigator}
              options={{
                drawerIcon: ({ focused, color }) => (
                  <Ionicons
                    name={
                      Platform.OS === 'android'
                        ? 'md-create'
                        : 'ios-create'
                    }
                    size={23}
                    color={focused ? Colors.defaultPrimary : color}
                  />
                ),
              }}
            />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default ShopDrawerNavigator;
