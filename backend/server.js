import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

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
app.use('/api/users', userRoutes);

// Error handler middleware
app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () =>
 console.log(
  `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
 )
);
