import React from 'react';
import { View } from 'react-native';
import s from './styles';

const CentredView = ({ children, left, right }) => {
  const alignItems = left
    ? 'flex-start'
    : right
    ? 'flex-end'
    : 'center';

  return (
    <View style={{ ...s.container, alignItems }}>{children}</View>
  );
};

export default CentredView;
