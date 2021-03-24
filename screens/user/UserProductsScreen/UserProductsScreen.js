import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../../components/shop/ProductItem/ProductItem';
import Colors from '../../../constants/Colors';
import {
  deleteProduct,
  fetchProducts,
  productsSelector,
} from '../../../store_new/shop/ProductsSlice';
import { useFocusEffect } from '@react-navigation/native';
import s from '../../shop/ProductsOverviewScreen/styles';

const UserProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userProducts, isFetching, isError } = useSelector(
    productsSelector,
  );

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
          onPress: () => dispatch(deleteProduct({ id })),
        },
      ],
    );
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

  if (!isFetching && userProducts?.length === 0) {
    return (
      <View style={s.center}>
        <Text>You have no products. Maybe try add one!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
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
