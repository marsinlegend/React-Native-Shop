import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from '../../api/Api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const res = await Api.fetchProducts();

      if (res.status === 201) {
        return {
          products: res.data.products.map((p) => ({
            ...p,
            ownerId: 'u1',
          })),
        };
      } else {
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async ({ title, description, imageUrl, price }, thunkAPI) => {
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
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

// export const updateProduct = createAsyncThunk(
//   'products/updateProduct',
//   async ({ id, title, description, imageUrl }, thunkAPI) => {
//     try {
//       const res = await Api.createProduct({
//         id,
//         title,
//         description,
//         imageUrl,
//       });
//
//       if (res.status === 201) {
//         return { ownerId: 'u1', ...res.data };
//       } else {
//         return thunkAPI.rejectWithValue(res.data);
//       }
//     } catch (e) {
//       console.log('Error', e.response.data);
//       return thunkAPI.rejectWithValue(e.response.data);
//     }
//   },
// );

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    userProducts: null,
    availableProducts: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.availableProducts = payload.products;
      state.userProducts = payload.products.filter(
        (prod) => prod.ownerId === 'u1',
      );
    },
    [fetchProducts.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchProducts.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
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
      state.errorMessage = payload.message;
    },
  },
});

export const { clearState } = productsSlice.actions;

export const productsSelector = (state) => state.products;
