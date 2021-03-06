import React from 'react';
import { Button, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem/ProductItem';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector(
    (state) => state.products.availableProducts,
  );
  const dispatch = useDispatch();

  const onSelectHandler = (id, title) => {
    navigation.navigate('ProductDetails', {
      productId: id,
      productTitle: title,
    });
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => {
            onSelectHandler(item.id, item.title);
          }}
        >
          <Button
            color={Colors.defaultPrimary}
            title="View Details"
            onPress={() => {
              onSelectHandler(item.id, item.title);
            }}
          />
          <Button
            color={Colors.defaultPrimary}
            title="To Card"
            onPress={() => {
              dispatch(cartActions.addToCart(item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverviewScreen;
