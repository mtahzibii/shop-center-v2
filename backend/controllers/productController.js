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

// @desc    Update a product
// @route   PUT /api/products/
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
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
 res.json(req.body);
 const { name, price, brand, image, category, countInStock, description } = req.body;

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

// @desc    Delete a products
// @route   DELETE /api/products/admin/products/:productId
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
 const product = Product.findById(req.params.productId);

 if (product) {
  const deletedProduct = await product.remove();
  res.status(200).json(deletedProduct);
 } else {
  res.status(404);
  throw new Error('Product not found');
 }
});

// @desc    Search products
// @route   GET /api/products
// @access  Public
const searchProdcuts = asyncHandler(async (req, res) => {
 const keyword = req.params.keyword
  ? {
     name: {
      $regex: req.params.keyword,
      $options: 'i',
     },
    }
  : {};

 const products = await Product.find({ ...keyword });

 if (products) {
  res.status(200).json(products);
 } else {
  res.status(404);
  throw new Error('Product not found');
 }
});

export {
 getAllProducts,
 getProduct,
 createProduct,
 updateProduct,
 deleteProduct,
 searchProdcuts,
};
