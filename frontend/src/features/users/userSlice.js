import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

// check if user is logged in
const localUser = JSON.parse(localStorage.getItem('userInfo'));

const initialState = {
 user: localUser ? localUser : null,
 isLoading: false,
 isSuccess: false,
 isError: false,
 message: '',
};

// Action register an new user (async action)
export const registerUser = createAsyncThunk(
 'users/registerUser',
 async (userData, thunkAPI) => {
  try {
   return await userService.register(userData);
  } catch (error) {
   const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

   return thunkAPI.rejectWithValue(message);
  }
 }
);

// Action login user (async action)
export const loginUser = createAsyncThunk(
 'users/getUser',
 async (userData, thunkAPI) => {
  try {
   return await userService.login(userData);
  } catch (error) {
   const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

   return thunkAPI.rejectWithValue(message);
  }
 }
);

// Action logout user
export const logoutUser = createAsyncThunk('users/logoutUser', async (thunkAPI) => {
 await userService.logout();
});

// Action get user profile
export const getUserProfile = createAsyncThunk(
 'users/getProfile',
 async (_, thunkAPI) => {
  try {
   const token = thunkAPI.getState().user.user.token;
   return await userService.getProfile(token);
  } catch (error) {
   const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

   return thunkAPI.rejectWithValue(message);
  }
 }
);

const userSlice = createSlice({
 name: 'user',
 initialState,
 reducers: {
  reset: (state) => {
   state.isError = false;
   state.isSuccess = false;
   state.isLoading = false;
   state.message = '';
  },
 },
 extraReducers: (builder) =>
  builder
   .addCase(loginUser.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(loginUser.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.user = action.payload;
   })
   .addCase(loginUser.rejected, (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = true;
    state.message = action.payload;
   })
   .addCase(registerUser.pending, (state, action) => {
    state.isLoading = true;
   })
   .addCase(registerUser.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.user = action.payload;
   })
   .addCase(registerUser.rejected, (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = true;
    state.message = action.payload;
   })
   .addCase(getUserProfile.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(getUserProfile.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.user = action.payload;
   })
   .addCase(getUserProfile.rejected, (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = true;
    state.message = action.payload;
   }),
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
