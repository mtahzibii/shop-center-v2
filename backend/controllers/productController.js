import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
 const products = await Product.find({});
 res.json(products);
});

// @desc    Get single product
// @route   GET /api/products/:productId
// @access  Public
const getProduct = asyncHandler(async (req, res) => {
 const product = await Product.findById(req.params.productId);

 if (product) {
  res.status(200).json(product);
 } else {
  res.status(404);
  throw new Error('Product not found');
 }
});

// @desc    Create a new product
// @route   POST /api/products/
// @access  Private
// const createProduct = asyncHandler(async (req, res) => {
//  const {
//   name,
//   image,
//   brand,
//   price,
//   category,
//   description,
//   reviews,
//   numReviews,
//   countInStock,
//  } = req.body;

//  // Find user in databse (req.user is get from protect in auth middleware)
//  const user = await User.findById(req.user.id);

//  if (!user) {
//   res.status(401);
//   throw new Error('User not found');
//  }

//  // Add to database
//  const product = await Product.create({
//   user: req.user.id,
//   name,
//   image,
//   brand,
//   price,
//   category,
//   description,
//   reviews,
//   numReviews,
//   countInStock,
//  });

//  res.status(201).json(product);
// });

// @desc    Update a product
// @route   PUT /api/products/
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
 console.log(req.body);
 console.log(req.user);

 const updatedProduct = await Product.findByIdAndUpdate(
  req.params.productId,
  req.body
 );

 //  if (updatedProduct) {
 res.status(201).json(updatedProduct);
 //  }
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
 const { name, price, brand, category, countInStock, description } = req.body;

 const updatedProduct = {
  name,
  price,
  image,
  brand,
  category,
  countInStock,
  description,
  user: req.user._id,
  numReviews: 0,
 };

 //  Insert product to DB
 const newProduct = await Product.create(updatedProduct);

 if (newProduct) {
  res.status(201).json(newProduct);
 } else {
  res.status(400);
  throw new Error('Failure in product creation');
 }
});

export { getAllProducts, getProduct, createProduct, updateProduct };
