import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  View,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../../components/shop/ProductItem/ProductItem';
import * as cartOperations from '../../../store/operations/cart';
import Colors from '../../../constants/Colors';
import s from './styles';
//
import {
  fetchProducts,
  productsSelector,
} from '../../../store_new/shop/ProductsSlice';

const ProductsOverviewScreen = ({ navigation, ...props }) => {
  const dispatch = useDispatch();
  const { availableProducts, isFetching, isError } = useSelector(
    productsSelector,
  );

  const onSelectHandler = (id, title) => {
    navigation.navigate('ProductDetails', {
      productId: id,
      productTitle: title,
    });
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchProducts());
    }, [dispatch]),
  );

  if (isError) {
    return (
      <View style={s.center}>
        <Text>An Error occurred!</Text>
        <Button
          title="Try again"
          onPress={() => dispatch(fetchProducts())}
        />
      </View>
    );
  }

  if (isFetching) {
    return (
      <View style={s.center}>
        <ActivityIndicator
          size="large"
          color={Colors.defaultPrimary}
        />
      </View>
    );
  }

  if (!isFetching && availableProducts?.length === 0) {
    return (
      <View style={s.center}>
        <Text>No products found. Maybe try add some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={availableProducts}
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
              dispatch(cartOperations.addToCart(item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverviewScreen;
