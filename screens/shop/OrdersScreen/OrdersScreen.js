import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import OrderItem from '../../../components/shop/OrderItem/OrderItem';

const OrdersScreen = () => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <OrderItem
          date={item.readableDate}
          amount={item.totalAmount}
          items={item.items}
        />
      )}
    />
  );
};

export default OrdersScreen;
