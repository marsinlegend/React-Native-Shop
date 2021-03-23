import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCTS,
  UPDATE_PRODUCT,
} from '../actions/products';
import { Api } from '../../api/Api';

export const fetchProducts = () => {
  return async (dispatch) => {
    const res = await Api.fetchProducts();

    console.log(res.data);

    dispatch({
      type: FETCH_PRODUCTS,
      products: res.data.products.map((p) => ({
        ...p,
        ownerId: 'u1',
      })),
    });
  };
};

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

    console.log(res);

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: res.data.product.id,
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
