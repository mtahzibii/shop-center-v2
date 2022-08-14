import express, { Router } from 'express';
import {
 loginUser,
 registerUser,
 getUserProfile,
 updateUserProfile,
 getAllUsers,
 getUserByAdmin,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/', protect, isAdmin, getAllUsers);
router.get('/admin/users/:userId', protect, isAdmin, getUserByAdmin);

export default router;
