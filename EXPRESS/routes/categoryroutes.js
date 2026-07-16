import express from 'express';
import categoryController from '../controllers/categorycontroller.js';
import validate from '../middleware/validation.js';
import { protect } from '../middleware/auth.js';
import isAdmin from '../middleware/admin.js';
import upload from '../middleware/upload.js';
import { createCategorySchema, updateCategorySchema } from '../validations/categoryvalidation.js';

const router = express.Router();

router.get('/', categoryController.getCategories);
router.get('/:slug', categoryController.getCategory);

router.post(
  '/',
  protect,
  isAdmin,
  upload.single('image'),
  validate(createCategorySchema),
  categoryController.createCategory
);
router.patch(
  '/:id',
  protect,
  isAdmin,
  upload.single('image'),
  validate(updateCategorySchema),
  categoryController.updateCategory
);
router.delete('/:id', protect, isAdmin, categoryController.deleteCategory);

export default router;
