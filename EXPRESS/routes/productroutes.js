import express from 'express';
import productController from '../controllers/productcontroller.js';
import validate from '../middleware/validation.js';
import { protect } from '../middleware/auth.js';
import isAdmin from '../middleware/admin.js';
import upload from '../middleware/upload.js';
import { createProductSchema, updateProductSchema, createReviewSchema } from '../validations/productvalidation.js';

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/:slug', productController.getProduct);

router.post(
  '/',
  protect,
  isAdmin,
  upload.array('images', 6),
  validate(createProductSchema),
  productController.createProduct
);
router.patch(
  '/:id',
  protect,
  isAdmin,
  upload.array('images', 6),
  validate(updateProductSchema),
  productController.updateProduct
);
router.delete('/:id', protect, isAdmin, productController.deleteProduct);

// Nested review routes: /api/products/:id/reviews
router.post('/:id/reviews', protect, validate(createReviewSchema), productController.addReview);
router.get('/:id/reviews', productController.getProductReviews);
router.delete('/:id/reviews/:reviewId', protect, productController.deleteReview);

export default router;
