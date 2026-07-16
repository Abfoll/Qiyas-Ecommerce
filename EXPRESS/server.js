import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';


import connectDB from './config/database.js';
import logger from './utils/logger.js';
import { errorHandler, notFound } from './middleware/errorhandler.js';
import { apiLimiter, authLimiter } from './middleware/ratelimiter.js';

// Route files
import homeRoutes from './routes/homeroutes.js';
import authRoutes from './routes/authroutes.js';
import userRoutes from './routes/userroutes.js';
import categoryRoutes from './routes/categoryroutes.js';
import productRoutes from './routes/productroutes.js';
import cartRoutes from './routes/cartroutes.js';
import orderRoutes from './routes/orderroutes.js';
import webhookRoutes from './routes/webhookroutes.js';
import wishlistRoutes from './routes/wishlistroutes.js';
import blogRoutes from './routes/blogroutes.js';
import contactRoutes from './routes/contactroutes.js';
import adminRoutes from './routes/adminroutes.js';

const app = express();

//  1. Connect to database 
const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

startServer();

//  2. Global middleware 
app.use(helmet()); // sets safe HTTP headers
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// IMPORTANT: the Stripe webhook route needs the RAW body to verify its signature,
// so it must be mounted BEFORE express.json() strips/parses the body.
app.use('/api/webhooks', express.raw({ type: 'application/json' }), webhookRoutes);

app.use(express.json({ limit: '50kb' })); // parse JSON body, cap size to prevent abuse
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev')); 
}

app.use('/api', apiLimiter); // general rate limit on every API route

//  3. Routes 
app.use('/api', homeRoutes);
app.use('/api/auth', authLimiter, authRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

//  4. 404 + Global error handler 
app.use(notFound);
app.use(errorHandler);

//  5. Start server 
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});




process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Closing server');

  server.close(() => {
    process.exit(0);
  });
});

export default app;
