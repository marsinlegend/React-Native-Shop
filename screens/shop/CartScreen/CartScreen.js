import React from 'react';
import { Button, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import s from './styles';
import Colors from '../../../constants/Colors';

const CartScreen = () => {
  const cartTotalAmount = useSelector(
    (state) => state.cart.totalAmount,
  );

  const cartItems = useSelector((state) => {
    const transformedCartItems = [];

    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }

    return transformedCartItems;
  });

  return (
    <View style={s.screen}>
      <View style={s.summary}>
        <Text style={s.summaryText}>
          Total: <Text style={s.amount}>{cartTotalAmount}</Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.defaultPrimary}
          onPress={() => {}}
          disabled={cartItems.length === 0}
        />
      </View>
      <View>
        <Text>CART ITEMS</Text>
      </View>
    </View>
  );
};

export default CartScreen;
