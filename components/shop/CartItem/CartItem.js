import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import s from './styles';

const CartItem = ({ title, quantity, amount, onRemove }) => {
  return (
    <View style={s.cartItem}>
      <View style={s.itemData}>
        <Text style={s.quantity}>{quantity} </Text>
        <Text style={s.title}>{title}</Text>
      </View>

      <View style={s.itemData}>
        <Text style={s.amount}>${amount.toFixed(2)}</Text>

        <TouchableOpacity onPress={onRemove} style={s.deleteButton}>
          <Ionicons
            name={
              Platform.OS === 'android' ? 'md-trash' : 'ios-trash'
            }
            color="red"
            size={23}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
