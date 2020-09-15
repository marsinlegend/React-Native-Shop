import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CartScreen(props) {
  return (
    <View style={s.container}>
      <Text>Search screen</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
