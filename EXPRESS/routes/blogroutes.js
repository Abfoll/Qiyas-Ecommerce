import express from 'express';
import blogController from '../controllers/blogcontroller.js';
import validate from '../middleware/validation.js';
import { protect } from '../middleware/auth.js';
import isAdmin from '../middleware/admin.js';
import upload from '../middleware/upload.js';
import { createPostSchema, updatePostSchema, createCommentSchema } from '../validations/blogvalidation.js';

const router = express.Router();

router.get('/', blogController.getPosts);
router.get('/:slug', blogController.getPost);

router.post(
  '/',
  protect,
  isAdmin,
  upload.single('coverImage'),
  validate(createPostSchema),
  blogController.createPost
);
router.patch(
  '/:id',
  protect,
  isAdmin,
  upload.single('coverImage'),
  validate(updatePostSchema),
  blogController.updatePost
);
router.delete('/:id', protect, isAdmin, blogController.deletePost);

// Comments
router.post('/:id/comments', protect, validate(createCommentSchema), blogController.addComment);
router.get('/:id/comments', blogController.getComments);
router.patch('/comments/:commentId/approve', protect, isAdmin, blogController.approveComment);
router.delete('/comments/:commentId', protect, blogController.deleteComment);

export default router;
