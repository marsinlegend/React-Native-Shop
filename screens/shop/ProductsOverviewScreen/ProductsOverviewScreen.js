import React, { useCallback, useEffect } from 'react';
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
import * as cartOperations from '../../../store/operations/cart';
import Colors from '../../../constants/Colors';
//
import {
  clearState,
  fetchProducts,
  productsSelector,
} from '../../../store_new/shop/ProductsSlice';
import CentredView from '../../../components/UI/CentredView/CentredView';

const ProductsOverviewScreen = ({ navigation, ...props }) => {
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

  useEffect(() => {
    if (isError) {
      clearState();
      Alert.alert('An Error occurred!', errMessage, [
        {
          text: 'Try again',
          onPress: () => dispatch(fetchProducts()),
        },
      ]);
    }
  }, [isError]);
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchProducts());
    }, [dispatch]),
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
  if (!availableProducts) {
    return (
      <CentredView>
        <Text>No products found. Maybe try add some!</Text>
      </CentredView>
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
