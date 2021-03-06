import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as productsActions from '../../../store/actions/products';
import s from './styles';

const EditProductsScreen = ({ route, navigation }) => {
  const prodId = route.params?.productId;
  const dispatch = useDispatch();
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId),
  );

  const [title, setTitle] = useState(
    editedProduct ? editedProduct.title : '',
  );
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : '',
  );
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : '',
  );

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(
          prodId,
          title,
          description,
          imageUrl,
        ),
      );
    } else {
      dispatch(
        productsActions.createProduct(
          title,
          description,
          imageUrl,
          +price,
        ),
      );
    }
    navigation.goBack();
  }, [dispatch, prodId, title, description, imageUrl, price]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={s.form}>
        <View style={s.formControl}>
          <Text style={s.label}>Title</Text>
          <TextInput
            style={s.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={s.formControl}>
          <Text style={s.label}>Image URL</Text>
          <TextInput
            style={s.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={s.formControl}>
            <Text style={s.label}>Price</Text>
            <TextInput
              style={s.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={s.formControl}>
          <Text style={s.label}>Description</Text>
          <TextInput
            style={s.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProductsScreen;
