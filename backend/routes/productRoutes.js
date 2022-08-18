import express from 'express';
const router = express.Router();
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import {
 getAllProducts,
 getProduct,
 createProduct,
 updateProduct,
 deleteProduct,
 searchProdcuts,
} from '../controllers/productController.js';

// Product routes
router.get('/', getAllProducts);
router.get('/:productId', getProduct);
router.get('/search/:keyword', searchProdcuts);
router.post('/admin/products', protect, isAdmin, createProduct);
router.put('/admin/products/:productId', protect, isAdmin, updateProduct);
router.delete('/admin/products/:productId', protect, isAdmin, deleteProduct);

export default router;
