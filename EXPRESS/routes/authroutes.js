import express from 'express';
import authController from '../controllers/authcontroller.js';
import validate from '../middleware/validation.js';
import { protect } from '../middleware/auth.js';
import { registerSchema, loginSchema, updatePasswordSchema } from '../validations/authvalidation.js';

const router = express.Router();

// Public routes
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

// Private routes (must be logged in)
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);
router.patch('/update-password', protect, validate(updatePasswordSchema), authController.updatePassword);

export default router;
