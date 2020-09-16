import React from 'react';
import { Button, Image, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import s from './styles';
import Colors from '../../../constants/Colors';

const ProductDetailsScreen = ({ route, onAddToCard }) => {
  const productId = route.params.productId;
  const product = useSelector((state) =>
    state.products.availableProducts.find(
      (prod) => prod.id === productId,
    ),
  );

  return (
    <ScrollView>
      <Image style={s.img} source={{ uri: product.imageUrl }} />

      <View style={s.actions}>
        <Button
          color={Colors.defaultPrimary}
          title="Add To Card"
          onPress={onAddToCard}
        />
      </View>

      <Text style={s.price}>${product.price.toFixed(2)}</Text>
      <Text style={s.description}>{product.description}</Text>
    </ScrollView>
  );
};
export default ProductDetailsScreen;
