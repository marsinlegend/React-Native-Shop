import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import s from './styles';
import Colors from '../../../constants/Colors';
import CartItem from '../CartItem/CartItem';
import Card from '../../UI/Card/Card';

const OrderItem = ({ amount, date, items }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={s.orderItem}>
      <View style={s.summary}>
        <Text style={s.totalAmount}>${amount.toFixed(2)} </Text>
        <Text style={s.date}>{date}</Text>
      </View>

      <Button
        color={Colors.defaultPrimary}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View style={s.detailItems}>
          {items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

export default OrderItem;
