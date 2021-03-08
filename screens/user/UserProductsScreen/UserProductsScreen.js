import React from 'react';
import { Alert, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../../components/shop/ProductItem/ProductItem';
import Colors from '../../../constants/Colors';
import * as productsOperations from '../../../store/operations/products';

const UserProductsScreen = ({ navigation }) => {
  const userProducts = useSelector(
    (state) => state.products.userProducts,
  );
  const dispatch = useDispatch();

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
            dispatch(productsOperations.deleteProduct(id));
          },
        },
      ],
    );
  };

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
