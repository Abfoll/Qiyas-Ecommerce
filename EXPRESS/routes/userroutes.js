import express from 'express';
import userController from '../controllers/usercontroller.js';
import { protect } from '../middleware/auth.js';
import isAdmin from '../middleware/admin.js';

const router = express.Router();

// All routes below require a logged-in user
router.use(protect);

router.patch('/profile', userController.updateProfile);

// Admin-only routes
router.get('/', isAdmin, userController.getAllUsers);
router.get('/:id', isAdmin, userController.getUserById);
router.patch('/:id/deactivate', isAdmin, userController.deactivateUser);

export default router;
