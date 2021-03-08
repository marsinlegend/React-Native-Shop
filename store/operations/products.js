import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from '../actions/products';
import { Api } from '../../api/Api';

export const createProduct = (
  title,
  description,
  imageUrl,
  price,
) => {
  return async (dispatch) => {
    const res = await Api.createProduct({
      title,
      description,
      imageUrl,
      price,
    });

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: res.product.id,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  pid: productId,
});

export const updateProduct = (id, title, description, imageUrl) => ({
  type: UPDATE_PRODUCT,
  pid: id,
  productData: {
    title,
    description,
    imageUrl,
  },
});
