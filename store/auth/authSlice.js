import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from '../../api/Api';

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await Api.signup({ name, email, password });

      console.log(res);

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

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { getState, rejectWithValue }) => {
    try {
      const res = await Api.login({ email, password });

      console.log(res);

      if (res.status === 200) {
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

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: [],
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
      state.errMessage = '';

      return state;
    },
  },
  extraReducers: {
    [signup.fulfilled]: (state, { payload }) => {
      state.isFetching = false;

      state.token = payload.token;
    },
    [signup.pending]: (state) => {
      state.isFetching = true;
    },
    [signup.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errMessage = payload;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.isFetching = false;

      state.token = payload.token;
    },
    [login.pending]: (state) => {
      state.isFetching = true;
    },
    [login.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errMessage = payload;
    },
  },
});

export const { clearState } = authSlice.actions;

export const authSelector = (state) => state.auth;
