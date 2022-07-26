import express from 'express';
const router = express.Router();
import protect from '../middleware/authMiddleware.js';
import {
 getAllProducts,
 getProduct,
 createProduct,
} from '../controllers/productController.js';

// Product routes
router.get('/', getAllProducts);
router.get('/:productId', getProduct);
router.post('/', protect, createProduct);

export default router;
