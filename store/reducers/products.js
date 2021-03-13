import PRODUCTS from '../../data/dummy-data';
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCTS,
  UPDATE_PRODUCT,
} from '../actions/products';
import Product from '../../models/Product';

const INITIAL_STATE = {
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
  availableProducts: PRODUCTS,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_PRODUCT: {
      const newProd = new Product(
        action.productData.id,
        'u1',
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price,
      );
      return {
        ...state,
        userProducts: state.userProducts.concat(newProd),
        availableProducts: state.availableProducts.concat(newProd),
      };
    }

    case UPDATE_PRODUCT: {
      const productIdx = state.userProducts.findIndex(
        (prod) => prod.id === action.pid,
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIdx].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIdx].price,
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIdx] = updatedProduct;

      const availableProductIdx = state.availableProducts.findIndex(
        (prod) => prod.id === action.pid,
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIdx] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
    }

    case DELETE_PRODUCT: {
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (prod) => prod.id !== action.pid,
        ),
        availableProducts: state.availableProducts.filter(
          (prod) => prod.id !== action.pid,
        ),
      };
    }

    case FETCH_PRODUCTS: {
      return {
        availableProducts: action.products,
        userProducts: action.products.filter(
          (prod) => prod.ownerId === 'u1',
        ),
      };
    }
  }

  return state;
};
