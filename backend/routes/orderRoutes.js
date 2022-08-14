import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import {
 createOrder,
 getOrder,
 getAllOrders,
 updateOrderToPaid,
} from '../controllers/orderController.js';

// Order routes
router.post('/', protect, createOrder);
router.get('/:orderId', protect, getOrder);
router.get('/', protect, getAllOrders);
router.put('/:orderId/pay', updateOrderToPaid);

export default router;
