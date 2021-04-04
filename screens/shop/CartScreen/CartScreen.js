import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../components/UI/Card/Card';
import {
  cartSelector,
  removeFromCart,
} from '../../../store/shop/CartSlice';
import s from './styles';
import Colors from '../../../constants/Colors';
import {
  clearState,
  createOrder,
  ordersSelector,
} from '../../../store/shop/OrdersSlice';
import CartItem from '../../../components/shop/CartItem/CartItem';
import { useFocusEffect } from '@react-navigation/native';

const CartScreen = () => {
  const { totalAmount, items } = useSelector(cartSelector);
  const { isFetching, isError, errMessage } = useSelector(
    ordersSelector,
  );
  const dispatch = useDispatch();

  let cartItems = [];

  for (const key in items) {
    cartItems.push({
      productId: key,
      productTitle: items[key].productTitle,
      productPrice: items[key].productPrice,
      quantity: items[key].quantity,
      sum: items[key].sum,
    });
  }
  cartItems.sort((a, b) => (a.productId > b.productId ? 1 : -1));

  useFocusEffect(
    useCallback(() => {
      if (isError) {
        Alert.alert('Create Order error!', errMessage, [
          {
            text: 'Okay',
          },
        ]);
        dispatch(clearState());
      }
    }, [isError]),
  );

  return (
    <View style={s.screen}>
      <Card style={s.summary}>
        <Text style={s.summaryText}>
          Total:{' '}
          <Text style={s.amount}>
            {Math.round((totalAmount.toFixed(2) * 100) / 100)}
          </Text>
        </Text>
        {isFetching ? (
          <ActivityIndicator
            size="small"
            color={Colors.defaultPrimary}
          />
        ) : (
          <Button
            title="Order Now"
            color={Colors.defaultPrimary}
            disabled={cartItems.length === 0}
            onPress={() => {
              dispatch(
                createOrder({
                  orderItems: cartItems,
                  totalAmount,
                }),
              );
            }}
          />
        )}
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
              dispatch(removeFromCart(item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

export default CartScreen;
