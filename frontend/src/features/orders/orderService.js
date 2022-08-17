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

 //  Remove items from cart in local storage
 localStorage.removeItem('cartItems');
 localStorage.removeItem('paymentMethod');
 localStorage.removeItem('shippingAddress');

 return data;
};

// Get order from database using order API
const getOrderFromDB = async (orderId, token) => {
 const config = {
  headers: {
   Authorization: `Bearer ${token}`,
  },
 };
 const { data } = await axios.get(`${API_URL}/${orderId}`, config);

 return data;
};

// Get user logged in orders from database using order API
const getMyOrdersFromDB = async (token) => {
 const config = {
  headers: {
   Authorization: `Bearer ${token}`,
  },
 };
 const { data } = await axios.get('http://localhost:5000/api/orders', config);

 localStorage.setItem('orderInfo', JSON.stringify(data));
 return data;
};

// Update order info by payment
const orderPay = async (paymentResult, orderId, token) => {
 const config = {
  headers: {
   'Content-Type': 'application/json',
   Authorization: `Bearer ${token}`,
  },
 };
 const { data } = await axios.put(
  `${API_URL}/${orderId}/pay`,
  paymentResult,
  config
 );

 return data;
};

// Get all users's orders
const getAllOrdersByAdmin = async (token) => {
 const config = {
  headers: {
   'Content-Type': 'application/json',
   Authorization: `Bearer ${token}`,
  },
 };
 const { data } = await axios.get(`${API_URL}/admin/orders`, config);

 return data;
};

// Update order by admin
const updateOrderByAdmin = async (updatedOrder, token) => {
 const config = {
  headers: {
   'Content-Type': 'application/json',
   Authorization: `Bearer ${token}`,
  },
 };
 const { data } = await axios.put(
  `${API_URL}/admin/orders/${updatedOrder._id}`,
  updatedOrder,
  config
 );

 return data;
};

const orderService = {
 setOrdertoDB,
 getOrderFromDB,
 getMyOrdersFromDB,
 orderPay,
 getAllOrdersByAdmin,
 updateOrderByAdmin,
};
export default orderService;
