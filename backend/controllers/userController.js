import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
   id: user._id,
   name: user.name,
   email: user.email,
   token: generateToken(user._id),
  });
 } else {
  res.status(401);
  throw new Error('Invalid credentials');
 }
});

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
   password: hashedPassword,
   email,
   token: generateToken(user._id),
  });
 } else {
  res.status(400);
  throw new Error('Invalid user data');
 }
});

const generateToken = (id) => {
 return jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: '30m',
 });
};

export { loginUser, registerUser };