import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/ProductItem/ProductItem';

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector(
    (state) => state.products.availableProducts,
  );

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
              productTitle: item.title
            })
          }}
          onAddToCard={() => {}}
        />
      )}
    />
  );
};

export default ProductsOverviewScreen;
