import express, { Router } from 'express';
import {
 loginUser,
 registerUser,
 getUserProfile,
 updateUserProfile,
} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;
