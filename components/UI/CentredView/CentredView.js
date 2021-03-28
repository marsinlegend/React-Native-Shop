import React from 'react';
import { View } from 'react-native';
import s from './styles';

const CentredView = ({ children, left, right }) => {
  let alignItems = 'center';

  if (left) alignItems = 'flex-start';
  if (right) alignItems = 'flex-end';

  return (
    <View style={{ ...s.container, alignItems }}>{children}</View>
  );
};

export default CentredView;
