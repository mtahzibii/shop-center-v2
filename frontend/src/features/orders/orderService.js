import axios from 'axios';
const API_URL = 'http://localhost:5000/api/orders';

// Add order to database and save in local storage
const setOrdertoDB = async (orderDetails, token) => {
 const config = {
  headers: {
   'Content-Type': 'application/json',
   Authorization: `Bearer ${token}`,
  },
 };
 const { data } = await axios.post(API_URL, orderDetails, config);

 // Save order info in local storage
 localStorage.setItem('orderInfo', JSON.stringify(data));

 return data;
};

// Find order from API
const getOrder = async (orderId, token) => {
 const config = {
  headers: {
   Authorization: `Bearer ${token}`,
  },
 };
 const { data } = await axios.get(`${API_URL}/${orderId}`, config);

 console.log(data);
 return data;
};

const orderService = { setOrdertoDB };
export default orderService;
