import axios from 'axios';
const API_URL = 'http://localhost:5000/api/users';

// Register user via API
const register = async (userData) => {
 const { data } = await axios.post(`${API_URL}/register`, userData);

 localStorage.setItem('userInfo', JSON.stringify(data));
 return data;
};

// Login user via API
const login = async (userData) => {
 const { data } = await axios.post(`${API_URL}/login`, userData);

 if (data) {
  localStorage.setItem('userInfo', JSON.stringify(data));
 }
 return data;
};

const logout = async () => {
 localStorage.removeItem('userInfo');
};

const userService = { login, register, logout };
export default userService;
