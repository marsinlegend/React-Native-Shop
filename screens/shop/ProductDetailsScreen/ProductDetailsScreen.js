import React from 'react';
import { Button, Image, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../store/shop/CartSlice';
import s from './styles';
import Colors from '../../../constants/Colors';

const ProductDetailsScreen = ({ route }) => {
  const productId = route.params.productId;
  const product = useSelector((state) =>
    state.products.availableProducts.find(
      (prod) => prod.id === productId,
    ),
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image
        style={s.img}
        source={{ uri: `https://rn-places-api.herokuapp.com/${product.image}` }}
      />

      <View style={s.actions}>
        <Button
          color={Colors.defaultPrimary}
          title="Add To Card"
          onPress={() => {
            dispatch(addToCart(product));
          }}
        />
      </View>

      <Text style={s.price}>${product.price.toFixed(2)}</Text>
      <Text style={s.description}>{product.descr}</Text>
    </ScrollView>
  );
};
export default ProductDetailsScreen;
