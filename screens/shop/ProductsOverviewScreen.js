import React from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem/ProductItem';
import * as cartActions from '../../store/actions/cart';

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector(
    (state) => state.products.availableProducts,
  );

  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onViewDetails={() => {
            navigation.navigate('ProductDetails', {
              productId: item.id,
              productTitle: item.title,
            });
          }}
          onAddToCard={() => {
            dispatch(cartActions.addToCart(item));
          }}
        />
      )}
    />
  );
};

export default ProductsOverviewScreen;
