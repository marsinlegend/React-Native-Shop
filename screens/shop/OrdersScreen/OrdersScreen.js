import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearState,
  fetchOrders,
  ordersSelector,
} from '../../../store/shop/OrdersSlice';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, Alert, FlatList } from 'react-native';
import OrderItem from '../../../components/shop/OrderItem/OrderItem';
import { readableDate } from '../../../helpers/readableDate';
import CentredView from '../../../components/UI/CentredView/CentredView';
import Colors from '../../../constants/Colors';

const OrdersScreen = () => {
  const dispatch = useDispatch();
  const { orders, isFetching, isError, errMessage } = useSelector(
    ordersSelector,
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchOrders());

      return () => {
        dispatch(clearState());
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (isError) {
        Alert.alert('Orders error occurred!', errMessage, [
          {
            text: 'Okay',
          },
        ]);
        dispatch(clearState());
      }
    }, [isError]),
  );

  if (isFetching) {
    return (
      <CentredView>
        <ActivityIndicator
          size="large"
          color={Colors.defaultPrimary}
        />
      </CentredView>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <OrderItem
            date={readableDate(item.date)}
            amount={+item.totalAmount}
            items={item.orderItems}
          />
        );
      }}
    />
  );
};

export default OrdersScreen;
