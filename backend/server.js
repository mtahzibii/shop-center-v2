import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import products from './data/products.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialize app
const app = express();

// Disable error <No 'Access-Control-Allow-Origin>
app.use(
 cors({
  origin: '*',
 })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/products', productRoutes);
// app.use('/api/users', userRoutes);

app.listen(PORT, () =>
 console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
