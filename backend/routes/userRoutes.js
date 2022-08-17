import express, { Router } from 'express';
import {
 loginUser,
 registerUser,
 getUserProfile,
 updateUserProfile,
 getAllUsers,
 getUserByAdmin,
 updateUserProfileByAdmin,
 deleteUser,
} from '../controllers/userController.js';

import { protect, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/admin/users', protect, isAdmin, getAllUsers);
router.get('/admin/users/:userId', protect, isAdmin, getUserByAdmin);
router.put('/admin/users/:userId', protect, isAdmin, updateUserProfileByAdmin);
router.delete('/admin/users/:userId', protect, isAdmin, deleteUser);

export default router;
