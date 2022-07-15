import express from 'express';
import products from '../data/products.js';

const router = express.Router();

router.get('/', (req, res) => {
 res.send(products);
});
router.get('/:productId', (req, res) => {
 const product = products.find((product) => product._id === req.params.productId);
 res.send(product);
});

export default router;
