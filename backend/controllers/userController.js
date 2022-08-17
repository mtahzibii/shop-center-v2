import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
 const { name, email, password } = req.body;

 if (!name || !password || !email) {
  res.status(400).json({ message: 'Please include all fields' });
 }

 // Find if user already exist
 const userExists = await User.findOne({ email });

 if (userExists) {
  res.status(400);
  throw new Error('User already exists');
 }

 //  Hash password
 const hashedPassword = await bcrypt.hash(password, 10);

 const user = await User.create({
  name,
  email,
  password: hashedPassword,
 });

 if (user) {
  res.status(201).json({
   _id: user._id,
   name,
   email,
   isAdmin: user.isAdmin,
   token: generateToken(user._id),
  });
 } else {
  res.status(400);
  throw new Error('Invalid user data');
 }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
 const users = await User.find({});

 if (users) {
  res.status(200).json(users);
 } else {
  res.status(400);
  throw new Error('Users not found');
 }
});

// @desc    Login a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
 const { password, email } = req.body;

 if (!password || !email) {
  res.status(401).json({ message: 'Please include all fields ' });
 }

 //  Fetch user data from database
 const user = await User.findOne({ email });

 //  Check user and passwords match
 if (user && (await bcrypt.compare(password, user.password))) {
  res.status(200);
  res.json({
   _id: user._id,
   name: user.name,
   email: user.email,
   isAdmin: user.isAdmin,
   token: generateToken(user._id),
  });
 } else {
  res.status(401);
  throw new Error('Username or password is incorrect!');
 }
});

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
 const user = await User.findById(req.user._id);

 if (!user) {
  res.status(404);
  throw new Error('User not found');
 }

 res.status(200);
 res.json({
  id: req.user._id,
  name: req.user.name,
  email: req.user.email,
  isAdmin: req.user.isAdmin,
  token: generateToken(req.user._id),
 });
});

// @desc    Update user profile
// @route   POST /api/users/:userId
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
 const user = await User.findById(req.user._id);

 if (user) {
  user.name = req.body.name || req.user.name;
  user.email = req.body.email || req.user.email;

  if (req.body.password) {
   //  Hash password
   const hashedPassword = await bcrypt.hash(req.body.password, 10);

   user.password = hashedPassword;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user._id, user);

  res.status(200);

  res.json({
   _id: updatedUser._id,
   name: updatedUser.name,
   email: updatedUser.email,
   isAdmin: updatedUser.isAdmin,
   token: generateToken(updatedUser._id),
  });
 } else {
  res.status(404);
  throw new Error('User not authorized');
 }
});

// @desc    Get user profile by admin
// @route   GET /api/users/admin/users/:userId
// @access  Private/Admin
const getUserByAdmin = asyncHandler(async (req, res) => {
 const user = await User.findById(req.params.userId);

 if (user) {
  res.status(200).json({
   _id: user._id,
   name: user.name,
   email: user.email,
   isAdmin: user.isAdmin,
  });
 } else {
  res.status(404);
  throw new Error('User not found');
 }
});

// @desc    Update user profile by admin
// @route   PUT /api/users/admin/users/:userId
// @access  Private/Admin
const updateUserProfileByAdmin = asyncHandler(async (req, res) => {
 const updatedProfile = await User.findByIdAndUpdate(
  req.params.userId,
  req.body
 ).select('-password');

 res.status(201).json(updatedProfile);
});

// @desc    Delete user by admin priviledge
// @route   DELETE /api/users/admin/users/:userId
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
 const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

 if (deletedUser) {
  res.status(200).json(deletedUser);
 } else {
  res.status(400);
  throw new Error('User not found');
 }
});

// Generate Token
const generateToken = (id) => {
 return jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: '5h',
 });
};

export {
 loginUser,
 registerUser,
 getUserProfile,
 updateUserProfile,
 getAllUsers,
 getUserByAdmin,
 updateUserProfileByAdmin,
 deleteUser,
};
