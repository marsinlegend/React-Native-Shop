import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from '../../api/Api';

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ items, amount }, thunkAPI) => {
    try {
      const res = await Api.createOrder({
        userId: 'u1',
        items,
        amount,
      });

      if (res.status === 201) {
        return { ...res.data };
      } else {
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errMessage: '',
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
    [createOrder.fulfilled]: (state, { payload }) => {
      state.isFetching = false;

      state.order.concat(payload.order);
    },
    [createOrder.pending]: (state) => {
      state.isFetching = true;
    },
    [createOrder.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errMessage = payload;
    },
  },
});

export const { clearState } = ordersSlice.actions;

export const ordersSelector = (state) => state.orders;
