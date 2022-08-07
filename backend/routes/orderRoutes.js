import express from 'express';
const router = express.Router();
import protect from '../middleware/authMiddleware.js';
import {
 createOrder,
 getOrder,
 getAllOrders,
} from '../controllers/orderController.js';

router.post('/', protect, createOrder);
router.get('/:orderId', protect, getOrder);
router.get('/', getAllOrders);

export default router;
