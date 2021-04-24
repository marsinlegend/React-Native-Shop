import React from 'react';
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/auth/authSlice';
import Colors from '../../../constants/Colors';

const LogoutButton = (props) => {
  const dispatch = useDispatch();

  return (
    <Button
      title="Logout"
      color={Colors.defaultPrimary}
      onPress={() => {
        dispatch(logout());
      }}
    />
  );
};

export default LogoutButton;
