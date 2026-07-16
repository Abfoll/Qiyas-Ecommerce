import express from 'express';
import contactController from '../controllers/contactcontroller.js';
import validate from '../middleware/validation.js';
import { protect } from '../middleware/auth.js';
import isAdmin from '../middleware/admin.js';
import { contactMessageSchema } from '../validations/contactvalidation.js';

const router = express.Router();

router.post('/', validate(contactMessageSchema), contactController.submitMessage);

router.get('/', protect, isAdmin, contactController.getMessages);
router.get('/:id', protect, isAdmin, contactController.getMessageById);
router.patch('/:id/status', protect, isAdmin, contactController.updateStatus);
router.delete('/:id', protect, isAdmin, contactController.deleteMessage);

export default router;
