import React from 'react';

export const options = ({ navigation, route }) => {
  return {
    title: route.params?.productId ? 'Edit Product' : 'Add Product',
  };
};
