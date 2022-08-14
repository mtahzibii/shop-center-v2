// import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
const API_URL = 'http://localhost:5000/api/users';

// Register user via API
const register = async (userData) => {
 const config = {
  Headers: {
   'Content-Type': 'Application/json',
  },
 };
 const { data } = await axios.post(`${API_URL}/register`, userData, config);

 localStorage.setItem('userInfo', JSON.stringify(data));
 return data;
};

// Login user via API
const login = async (userData) => {
 // Set http header
 const config = {
  Headers: {
   'Content-Type': 'Application/json',
  },
 };
 const { data } = await axios.post(`${API_URL}/login`, userData, config);

 if (data) {
  localStorage.setItem('userInfo', JSON.stringify(data));
 }

 return data;
};

// Get user profile
const getProfile = async (token) => {
 const config = {
  headers: {
   Authorization: `Bearer ${token}`,
  },
 };

 const { data } = await axios.get(`${API_URL}/profile`, config);

 return data;
};

// Get user profile by admin
const getUserProfileByAdmin = async (token, userId) => {
 const config = {
  headers: {
   Authorization: `Bearer ${token}`,
  },
 };
 const { data } = await axios.get(`${API_URL}/admin/users/${userId}`, config);

 localStorage.setItem('userEditInfo', JSON.stringify(data));

 return data;
};

// Update user profile
const updateProfile = async (userProfileData, token) => {
 const config = {
  headers: {
   Authorization: `Bearer ${token}`,
  },
 };
 const { data } = await axios.put(`${API_URL}/profile`, userProfileData, config);

 return data;
};

// Get all users data
const getAllUsers = async (token) => {
 const config = {
  headers: {
   Authorization: `Bearer ${token}`,
  },
 };
 const { data } = await axios.get(API_URL, config);

 return data;
};

// Update user profile by Admin
const updateUserProfileByAdmin = async (userProfileData, token) => {
 const config = {
  headers: {
   Authorization: `Bearer ${token}`,
  },
 };
 const { data } = await axios.put(
  `${API_URL}/admin/users/${userProfileData._id}`,
  userProfileData,
  config
 );

 return data;
};

// Logout user
const logout = async () => {
 localStorage.removeItem('userInfo');
};

const userService = {
 login,
 register,
 logout,
 getProfile,
 updateProfile,
 getAllUsers,
 getUserProfileByAdmin,
 updateUserProfileByAdmin,
};
export default userService;
