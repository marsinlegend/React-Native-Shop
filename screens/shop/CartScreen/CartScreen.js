import React from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles';
import Colors from '../../../constants/Colors';
import CartItem from '../../../components/shop/CartItem/CartItem';
import * as cartActions from '../../../store/actions/cart';

const CartScreen = () => {
  const cartTotalAmount = useSelector(
    (state) => state.cart.totalAmount,
  );
  const dispatch = useDispatch();

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

    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1,
    );
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

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <CartItem
            title={item.productTitle}
            quantity={item.quantity}
            amount={item.sum}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

export default CartScreen;
