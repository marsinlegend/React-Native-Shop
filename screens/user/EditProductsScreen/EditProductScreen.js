import React, { useCallback, useEffect } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as productsActions from '../../../store/actions/products';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../util/validators';
import s from './styles';
import Input from '../../../components/UI/Input/Input';
import { useForm } from '../../../hooks/formHook';

const EditProductsScreen = ({ route, navigation }) => {
  const prodId = route.params?.productId;
  const dispatch = useDispatch();
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId),
  );
  const initCreateProdInputs = {
    title: {
      value: '',
      isValid: false,
    },

    imageUrl: {
      value: '',
      isValid: false,
    },

    price: {
      value: '',
      isValid: false,
    },

    description: {
      value: null,
      isValid: false,
    },
  };
  const [formState, inputHandler] = useForm(
    !editedProduct
      ? initCreateProdInputs
      : {
          ...initCreateProdInputs,
          price: undefined,
        },
    false,
  );

  const submitHandler = useCallback(() => {
    if (!formState.isValid) {
      Alert.alert(
        'Wrong input!',
        'Please check the errors in the form.',
        [
          {
            text: 'Okay',
          },
        ],
      );
      return;
    }
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(
          prodId,
          formState.inputs.title.value,
          formState.inputs.description.value,
          formState.inputs.imageUrl.value,
        ),
      );
    } else {
      dispatch(
        productsActions.createProduct(
          formState.inputs.title.value,
          formState.inputs.description.value,
          formState.inputs.imageUrl.value,
          +formState.inputs.price.value,
        ),
      );
    }
    navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={s.form}>
          <Input
            id="title"
            label="Title"
            placeholder="Type here title"
            errorText="Please enter a valid description (at least 5 characters)."
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
            initValue={editedProduct ? editedProduct.title : ''}
            initValid={!!editedProduct}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />
          <Input
            id="imageUrl"
            label="Image URL"
            placeholder="Type here image url"
            errorText="Please enter a valid image url"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            initValue={editedProduct ? editedProduct.imageUrl : ''}
            initValid={!!editedProduct}
            returnKeyType="next"
            keyboardType="default"
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              placeholder="Type here price"
              errorText="Please enter a valid price"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              initValue={editedProduct ? editedProduct.price : ''}
              initValid={!!editedProduct}
              returnKeyType="next"
              keyboardType="decimal-pad"
            />
          )}
          <Input
            id="description"
            label="Description"
            placeholder="Type here description"
            errorText="Please enter a valid description (at least 10 characters)."
            validators={[VALIDATOR_MINLENGTH(10)]}
            onInput={inputHandler}
            initValue={editedProduct ? editedProduct.description : ''}
            initValid={!!editedProduct}
            autoCorrect
            autoCapitalize="sentences"
            keyboardType="default"
            multiline
            numberOfLines={3}
            returnKeyType="done"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProductsScreen;
