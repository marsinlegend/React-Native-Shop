import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from '../../api/Api';
import { Storage } from '../../api/Storage';

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const { token } = await Storage.getData('user');

      return { token };
    } catch (e) {
      console.log('Error', e.response.data);
      return rejectWithValue(e.response.data);
    }
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await Api.signup({ name, email, password });

      if (res.status === 201) {
        await Storage.setData('user', res.data.user);

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
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await Api.login({ email, password });

      if (res.status === 200) {
        await Storage.setData('user', res.data.user);

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
    user: null,
    isLoggedIn: null,
    isFetching: false,
    isError: false,
    errMessage: '',
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isFetching = false;
      state.errMessage = '';

      return state;
    },
  },
  extraReducers: {
    [checkAuth.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isLoggedIn = !!payload.token;
    },
    [checkAuth.pending]: (state) => {
      state.isFetching = true;
    },
    [checkAuth.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errMessage = payload;
    },
    [signup.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isLoggedIn = true;

      state.user = payload.user;
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
      state.isLoggedIn = true;

      state.user = payload.user;
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
