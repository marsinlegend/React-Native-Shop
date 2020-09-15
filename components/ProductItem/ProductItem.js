import React from 'react';
import { Button, Image, Text, View } from 'react-native';
import s from './styles';
import Colors from '../../constants/Colors';

const ProductItem = ({
  title,
  price,
  image,
  onViewDetails,
  onAddToCard,
}) => {
  return (
    <View style={s.product}>
      <View style={s.imgContainer}>
        <Image style={s.img} source={{ uri: image }} />
      </View>

      <View style={s.details}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.price}>${price.toFixed(2)}</Text>
      </View>

      <View style={s.actions}>
        <Button
          color={Colors.defaultPrimary}
          title="View Details"
          onPress={onViewDetails}
        />
        <Button
          color={Colors.defaultPrimary}
          title="To Card"
          onPress={onAddToCard}
        />
      </View>
    </View>
  );
};

export default ProductItem;
