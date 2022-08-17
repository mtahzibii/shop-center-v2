import express from 'express';
const router = express.Router();
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import {
 createOrder,
 getOrder,
 getAllUserOrders,
 updateOrderToPaid,
 getAllOrders,
 updateOrder,
} from '../controllers/orderController.js';

// Order routes
router.post('/', protect, createOrder);
router.get('/', protect, getAllUserOrders);
router.get('/:orderId', protect, getOrder);
router.put('/:orderId/pay', updateOrderToPaid);
router.get('/admin/orders', protect, isAdmin, getAllOrders);
router.put('/admin/orders/:orderId', protect, isAdmin, updateOrder);

export default router;
