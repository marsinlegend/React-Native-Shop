import React, { useCallback, useEffect } from 'react';
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
      console.log('focused User Prod');

      return () => {
        dispatch(clearState());
        console.log('unfocused cleared');
      };
    }, []),
  );
  useEffect(() => {
    if (isError) {
      Alert.alert('An Error!', errMessage, [
        {
          text: 'Okay',
        },
      ]);
    }
  }, []);

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
