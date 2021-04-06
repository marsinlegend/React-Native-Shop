import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from '../../api/Api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.fetchProducts();

      if (res.status === 200) {
        return {
          products: res.data.products.map((p) => ({
            ...p,
            ownerId: 'u1',
          })),
        };
      } else {
        return rejectWithValue(res.data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return rejectWithValue(e.response.data);
    }
  },
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (
    { title, description, imageUrl, price },
    { rejectWithValue },
  ) => {
    try {
      const res = await Api.createProduct({
        title,
        description,
        imageUrl,
        price,
      });

      if (res.status === 201) {
        return { ownerId: 'u1', ...res.data };
      } else {
        return rejectWithValue(res.data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return rejectWithValue(e.response.data);
    }
  },
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (
    { id, title, description, imageUrl },
    { rejectWithValue },
  ) => {
    try {
      const res = await Api.updateProductById({
        id,
        body: { title, description, imageUrl },
      });

      if (res.status === 200) {
        return { ownerId: 'u1', ...res.data };
      } else {
        return rejectWithValue(res.data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return rejectWithValue(e.response.data);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await Api.deleteProduct(id);

      if (res.status === 200) {
        return { prodId: id, ...res.data };
      } else {
        return rejectWithValue(res.data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return rejectWithValue(e.response.data);
    }
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    userProducts: [],
    availableProducts: [],
    isFetching: false,
    isSuccess: false,
    isError: false, //TODO: Fix error handling
    errMessage: '',
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errMessage = '';

      return state;
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled]: (state, { payload }) => {
      state.isFetching = false;

      state.availableProducts = payload.products;
      state.userProducts = payload.products.filter(
        (prod) => prod.ownerId === 'u1',
      );
    },
    [fetchProducts.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchProducts.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errMessage = payload;
    },
    [createProduct.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.availableProducts.concat(payload.product);
      state.userProducts.concat(payload.product);
    },
    [createProduct.pending]: (state) => {
      state.isFetching = true;
    },
    [createProduct.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errMessage = payload;
    },
    [updateProduct.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.updatedProduct = payload.product;
      state.message = payload.message;
    },
    [updateProduct.pending]: (state) => {
      state.isFetching = true;
    },
    [updateProduct.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errMessage = payload;
    },
    [deleteProduct.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.userProducts = state.userProducts.filter(
        (prod) => prod.id !== payload.prodId,
      );
      state.availableProducts = state.availableProducts.filter(
        (prod) => prod.id !== payload.prodId,
      );
      state.message = payload.message;
    },
    [deleteProduct.pending]: (state) => {
      state.isFetching = true;
    },
    [deleteProduct.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errMessage = payload;
    },
  },
});

export const { clearState } = productsSlice.actions;

export const productsSelector = (state) => state.products;
