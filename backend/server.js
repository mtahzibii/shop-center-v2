import path from 'path';
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

connectDB();

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
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => {
 res.send(process.env.PAYPAL_CLIENT_ID);
});

// Using static folder
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Error handler middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
 console.log(
  `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
 )
);
