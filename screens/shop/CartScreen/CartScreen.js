import React from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../components/UI/Card/Card';
import Colors from '../../../constants/Colors';
import CartItem from '../../../components/shop/CartItem/CartItem';
import * as ordersActions from '../../../store/actions/orders';
import * as cartActions from '../../../store/actions/cart';
import s from './styles';

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
      <Card style={s.summary}>
        <Text style={s.summaryText}>
          Total:{' '}
          <Text style={s.amount}>
            {Math.round((cartTotalAmount.toFixed(2) * 100) / 100)}
          </Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.defaultPrimary}
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(
              ordersActions.addToCart(cartItems, cartTotalAmount),
            );
          }}
        />
      </Card>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <CartItem
            title={item.productTitle}
            quantity={item.quantity}
            amount={item.sum}
            deletable
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
