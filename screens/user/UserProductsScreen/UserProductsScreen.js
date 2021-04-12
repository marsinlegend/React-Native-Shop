import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../../components/shop/ProductItem/ProductItem';
import Colors from '../../../constants/Colors';
import {
  clearState,
  deleteProduct,
  fetchProducts,
  productsSelector,
} from '../../../store/shop/ProductsSlice';
import { useFocusEffect } from '@react-navigation/native';
import CentredView from '../../../components/UI/CentredView/CentredView';

const UserProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    userProducts,
    isFetching,
    isError,
    errMessage,
  } = useSelector(productsSelector);

  const onEditHandler = (id) => {
    navigation.navigate('EditProduct', {
      productId: id,
    });
  };

  const deleteHandler = (id) => {
    Alert.alert(
      'Are you sure?',
      'Do you really want to delete this item?',
      [
        { text: 'No', style: 'default' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteProduct({ id }));
            clearState();
          },
        },
      ],
    );
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
        Alert.alert(
          'Error while loading user products!',
          errMessage,
          [
            {
              text: 'Okay',
            },
          ],
        );
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
  if (userProducts.length === 0) {
    return (
      <CentredView>
        <Text>No user products found. Maybe try add some!</Text>
      </CentredView>
    );
  }
  return (
    <FlatList
      onRefresh={() => dispatch(fetchProducts())}
      refreshing={isFetching}
      data={userProducts}
      renderItem={({ item }) => (
        <ProductItem
          image={item.image}
          title={item.title}
          price={item.price}
          onSelect={() => {
            onEditHandler(item.id);
          }}
        >
          <Button
            color={Colors.defaultPrimary}
            title="Edit"
            onPress={() => {
              onEditHandler(item.id);
            }}
          />
          <Button
            color={Colors.defaultPrimary}
            title="Delete"
            onPress={deleteHandler.bind(this, item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;
