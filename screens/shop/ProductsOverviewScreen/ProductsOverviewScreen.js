import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Text,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../../components/shop/ProductItem/ProductItem';
import Colors from '../../../constants/Colors';
import { addToCart } from '../../../store/shop/CartSlice';
//
import {
  clearState,
  fetchProducts,
  productsSelector,
} from '../../../store/shop/ProductsSlice';
import CentredView from '../../../components/UI/CentredView/CentredView';

const ProductsOverviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    availableProducts,
    isFetching,
    isError,
    errMessage,
  } = useSelector(productsSelector);

  const onSelectHandler = (id, title) => {
    navigation.navigate('ProductDetails', {
      productId: id,
      productTitle: title,
    });
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchProducts());

      return () => {
        dispatch(clearState());
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (isError) {
        Alert.alert('An Error occurred!', errMessage, [
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
  if (availableProducts.length === 0) {
    return (
      <CentredView>
        <Text>No products found. Maybe try add some!</Text>
      </CentredView>
    );
  }

  return (
    <FlatList
      onRefresh={() => dispatch(fetchProducts())}
      refreshing={isFetching}
      data={availableProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          image={item.image}
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
              dispatch(addToCart(item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverviewScreen;
