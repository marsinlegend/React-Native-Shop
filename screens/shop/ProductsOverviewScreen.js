import React, { useEffect } from 'react';
import { Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem/ProductItem';
import * as cartOperations from '../../store/operations/cart';
import * as productsOperations from '../../store/operations/products';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector(
    (state) => state.products.availableProducts,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsOperations.fetchProducts());
  }, [dispatch]);

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
              dispatch(cartOperations.addToCart(item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverviewScreen;
