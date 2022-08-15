import express from 'express';
const router = express.Router();
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import {
 getAllProducts,
 getProduct,
 createProduct,
 updateProduct,
} from '../controllers/productController.js';

// Product routes
router.get('/', getAllProducts);
router.get('/:productId', getProduct);
router.post('/', protect, isAdmin, createProduct);
router.put('/admin/products/:productId', protect, isAdmin, updateProduct);

export default router;
