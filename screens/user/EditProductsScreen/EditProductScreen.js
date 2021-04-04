import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../helpers/validators';
import s from './styles';
import Input from '../../../components/UI/Input/Input';
import { useForm } from '../../../hooks/formHook';
import {
  clearState,
  createProduct,
  productsSelector,
  updateProduct,
} from '../../../store/shop/ProductsSlice';
import CentredView from '../../../components/UI/CentredView/CentredView';
import Colors from '../../../constants/Colors';

const EditProductsScreen = ({ route, navigation }) => {
  const prodId = route.params?.productId;

  const dispatch = useDispatch();
  const { userProducts, isFetching, isSuccess } = useSelector(
    productsSelector,
  );
  const editedProduct = userProducts?.find(
    (prod) => prod.id === prodId,
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

  const submitHandler = useCallback(async () => {
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
      await dispatch(
        updateProduct({
          id: prodId,
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          imageUrl: formState.inputs.imageUrl.value,
        }),
      );
    } else {
      await dispatch(
        createProduct({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          imageUrl: formState.inputs.imageUrl.value,
          price: +formState.inputs.price.value,
        }),
      );
    }
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigation.goBack();
    }
  }, [isSuccess]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
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

        {isFetching && (
          <CentredView>
            <ActivityIndicator
              size="large"
              color={Colors.defaultPrimary}
            />
          </CentredView>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProductsScreen;
