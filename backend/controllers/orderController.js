import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

// @desc   Create order
// @route  POST /api/orders/
// @access Private
const createOrder = asyncHandler(async (req, res) => {
 const {
  orderItems,
  shippingAddress,
  paymentMethod,
  shippingPrice,
  taxPrice,
  totalPrice,
 } = req.body;

 //  Check if user logged in
 const user = await User.findById(req.user._id);

 if (!user) {
  res.status(401);
  throw new Error('User not found');
 }

 //  Check if cart is empty
 if (orderItems && orderItems.length === 0) {
  res.status(400);
  throw new Error('No order items');
 }

 // Add order to database
 const order = await Order.create({
  user: req.user._id,
  orderItems,
  shippingAddress,
  paymentMethod,
  taxPrice,
  shippingPrice,
  totalPrice,
 });

 res.status(201).json(order);
});

// @desc   Get an order
// @route  GET /api/orders/:orderId
// @access Private
const getOrder = asyncHandler(async (req, res) => {
 const orderId = req.params.orderId;

 const order = await Order.findById(orderId);

 if (order) {
  res.status(200).json(order);
 } else {
  res.status(404);
  throw new Error('Order not found');
 }
});

// @desc   Get logged in user  orders
// @route  GET /api/orders
// @Access Private
const getAllOrders = asyncHandler(async (req, res) => {
 const orders = await Order.find({ user: req.user._id });
 if (orders) {
  res.status(200).json(orders);
 } else {
  res.status(400);
  throw new Error('User not authorized!');
 }
});

// @desc   Update order to paid
// @route  PUT /api/orders/:orderId/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
 const orderId = req.params.orderId;

 const order = await Order.findById(orderId);

 //  Add payment result info into order document in DB
 if (order) {
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
   id: req.body.id,
   status: req.body.status,
   update_time: req.body.update_time,
   email_address: req.body.payer.email_address,
  };

  // Update order in DB
  const updatedOrder = await Order.findByIdAndUpdate(orderId, order);
  res.status(200).json(updatedOrder);
 } else {
  res.status(404);
  throw new Error('Order not found');
 }
});

export { createOrder, getOrder, getAllOrders, updateOrderToPaid };
