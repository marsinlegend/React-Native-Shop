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
  console.log(product);

  return (
    <ScrollView>
      <Image
        style={s.img}
        source={{ uri: `http://192.168.42.214:5000/${product.image}` }}
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
