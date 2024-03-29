import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

//  Check if user is logegd in
const protect = asyncHandler(async (req, res, next) => {
 let token;

 //  Check if token exists
 if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  try {
   // Get token from header
   token = req.headers.authorization.split(' ')[1];

   // Verify token
   const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

   // Get logged in user info from database
   req.user = await User.findById(decodedToken.id).select('-password');

   next();
  } catch (error) {
   res.status(401);
   throw new Error('Not authorized');
  }

  if (!token) {
   res.status(401);
   throw new Error('Not authorized');
  }
 }
});

// Check if admin is logged in
const isAdmin = (req, res, next) => {
 if (req.user && req.user.isAdmin) {
  next();
 } else {
  res.status(401);
  throw new Error('Not authorized as an admin');
 }
};

export { protect, isAdmin };
