import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

// check if user is logged in
const localUser = JSON.parse(localStorage.getItem('userInfo'));

const initialState = {
 users: [],
 user: localUser ? localUser : null,
 userEdit: null,
 isLoading: false,
 isSuccess: false,
 isError: false,
 message: '',
};

// Action register an new user (async action)
export const registerUser = createAsyncThunk(
 'user/registerUser',
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
 'user/getUser',
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
export const logoutUser = createAsyncThunk('user/logoutUser', async (thunkAPI) => {
 await userService.logout();
});

// Get user profile
export const getUserProfile = createAsyncThunk(
 'user/getProfile',
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

// Action get all users
export const getUsers = createAsyncThunk(
 'users/getAllUsers',
 async (_, thunkAPI) => {
  try {
   const token = thunkAPI.getState().user.user.token;
   return await userService.getAllUsers(token);
  } catch (error) {
   const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

   return thunkAPI.rejectWithValue(message);
  }
 }
);

// Action update user profile
export const updateUserProfile = createAsyncThunk(
 'user/updateProfile',
 async (userProfileData, thunkAPI) => {
  try {
   const token = thunkAPI.getState().user.user.token;
   return await userService.updateProfile(userProfileData, token);
  } catch (error) {
   const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

   return thunkAPI.rejectWithValue(message);
  }
 }
);

// Update user profile by Admin
export const updateUserByAdmin = createAsyncThunk(
 'user/updateProfileByAdmin',
 async (userProfileData, thunkAPI) => {
  try {
   const token = thunkAPI.getState().user.user.token;
   return await userService.updateUserProfileByAdmin(userProfileData, token);
  } catch (error) {
   const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

   return thunkAPI.rejectWithValue(message);
  }
 }
);

// Get user profile by Admin
export const getUserByAdmin = createAsyncThunk(
 'user/getUserProfileByAdmin',
 async (userId, thunkAPI) => {
  try {
   const token = thunkAPI.getState().user.user.token;
   return await userService.getUserProfileByAdmin(token, userId);
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
   })
   .addCase(updateUserProfile.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(updateUserProfile.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.user = action.payload;
   })
   .addCase(updateUserProfile.rejected, (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = true;
    state.message = action.payload;
   })
   .addCase(getUsers.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(getUsers.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.users = action.payload;
   })
   .addCase(getUsers.rejected, (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = true;
    state.message = action.payload;
   })
   .addCase(getUserByAdmin.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(getUserByAdmin.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.userEdit = action.payload;
   })
   .addCase(getUserByAdmin.rejected, (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = true;
    state.message = action.payload;
   })
   .addCase(updateUserByAdmin.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(updateUserByAdmin.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.userEdit = action.payload;
   })
   .addCase(updateUserByAdmin.rejected, (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = true;
    state.message = action.payload;
   }),
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
