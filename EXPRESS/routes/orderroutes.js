import express from 'express';
import orderController from '../controllers/ordercontroller.js';
import validate from '../middleware/validation.js';
import { protect } from '../middleware/auth.js';
import isAdmin from '../middleware/admin.js';
import { createOrderSchema, updateOrderStatusSchema } from '../validations/ordervalidation.js';

const router = express.Router();

router.use(protect);

router.post('/', validate(createOrderSchema), orderController.createOrder);
router.get('/my-orders', orderController.getMyOrders);
router.get('/:id', orderController.getOrderById);
router.patch('/:id/cancel', orderController.cancelOrder);

// Admin
router.get('/', isAdmin, orderController.getAllOrders);
router.patch('/:id/status', isAdmin, validate(updateOrderStatusSchema), orderController.updateOrderStatus);

export default router;
