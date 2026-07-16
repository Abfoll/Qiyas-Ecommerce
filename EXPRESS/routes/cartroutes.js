import express from 'express';
import cartController from '../controllers/cartcontroller.js';
import validate from '../middleware/validation.js';
import { protect } from '../middleware/auth.js';
import { addCartItemSchema, updateCartItemSchema } from '../validations/ordervalidation.js';

const router = express.Router();

router.use(protect); // every cart route requires a logged-in user

router.get('/', cartController.getCart);
router.post('/items', validate(addCartItemSchema), cartController.addItem);
router.patch('/items/:productId', validate(updateCartItemSchema), cartController.updateItem);
router.delete('/items/:productId', cartController.removeItem);
router.delete('/', cartController.clearCart);

export default router;
