import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/auth/authSlice';
import Colors from '../../../constants/Colors';

const LogoutButton = (props) => {
  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Button
        title="Logout"
        color={Colors.defaultPrimary}
        onPress={() => {
          dispatch(logout());
        }}
      />
    </DrawerContentScrollView>
  );
};

export default LogoutButton;
