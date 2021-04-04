import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from '../../api/Api';

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ orderItems, totalAmount }, { rejectWithValue }) => {
    try {
      const res = await Api.createOrder({
        orderItems,
        totalAmount,
      });

      if (res.status === 201) {
        return { ...res.data };
      } else {
        return rejectWithValue(res.data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return rejectWithValue(e.response.data);
    }
  },
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
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

      state.orders.concat(payload.order);
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
