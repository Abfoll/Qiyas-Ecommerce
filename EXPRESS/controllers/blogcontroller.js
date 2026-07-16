import BlogPost from "../models/blogpost.js";
import BlogComment from "../models/blogcomment.js";
import asyncHandler from "../utils/asynchandler.js";
import { ApiResponse, ApiError } from "../utils/apiresponse.js";
import { uploadBuffer, deleteImage } from "../services/uploadservice.js";

// @route   GET /api/blog
// @access  Public
export const getPosts = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);
  const skip = (page - 1) * limit;

  const filter = { isPublished: true };
  if (req.query.tag) filter.tags = req.query.tag;

  const [posts, total] = await Promise.all([
    BlogPost.find(filter).populate('author', 'name').sort('-publishedAt').skip(skip).limit(limit),
    BlogPost.countDocuments(filter),
  ]);

  return ApiResponse.success(res, {
    data: { posts },
    meta: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

// @route   GET /api/blog/:slug
// @access  Public
export const getPost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findOneAndUpdate(
    { slug: req.params.slug, isPublished: true },
    { $inc: { views: 1 } },
    { new: true }
  ).populate('author', 'name');

  if (!post) throw new ApiError(404, 'Blog post not found');
  return ApiResponse.success(res, { data: { post } });
});

// @route   POST /api/blog
// @access  Private/Admin
export const createPost = asyncHandler(async (req, res) => {
  const payload = { ...req.body, author: req.user.id };

  if (req.file) {
    payload.coverImage = await uploadBuffer(req.file.buffer, 'ecommerce/blog');
  }

  const post = await BlogPost.create(payload);
  return ApiResponse.success(res, { statusCode: 201, message: 'Post created', data: { post } });
});

// @route   PATCH /api/blog/:id
// @access  Private/Admin
export const updatePost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post) throw new ApiError(404, 'Blog post not found');

  if (req.file) {
    if (post.coverImage?.publicId) await deleteImage(post.coverImage.publicId);
    req.body.coverImage = await uploadBuffer(req.file.buffer, 'ecommerce/blog');
  }

  Object.assign(post, req.body);
  await post.save();

  return ApiResponse.success(res, { message: 'Post updated', data: { post } });
});

// @route   DELETE /api/blog/:id
// @access  Private/Admin
export const deletePost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post) throw new ApiError(404, 'Blog post not found');

  if (post.coverImage?.publicId) await deleteImage(post.coverImage.publicId);
  await BlogComment.deleteMany({ post: post._id });
  await post.deleteOne();

  return ApiResponse.success(res, { message: 'Post deleted' });
});

// ---------- Comments ----------

// @route   POST /api/blog/:id/comments
// @access  Private
export const addComment = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post) throw new ApiError(404, 'Blog post not found');

  const comment = await BlogComment.create({
    post: post._id,
    user: req.user.id,
    comment: req.body.comment,
  });

  return ApiResponse.success(res, {
    statusCode: 201,
    message: 'Comment submitted, pending approval',
    data: { comment },
  });
});

// @route   GET /api/blog/:id/comments
// @access  Public (only approved comments)
export const getComments = asyncHandler(async (req, res) => {
  const comments = await BlogComment.find({ post: req.params.id, isApproved: true }).populate('user', 'name');
  return ApiResponse.success(res, { data: { comments } });
});

// @route   PATCH /api/blog/comments/:commentId/approve
// @access  Private/Admin
export const approveComment = asyncHandler(async (req, res) => {
  const comment = await BlogComment.findByIdAndUpdate(req.params.commentId, { isApproved: true }, { new: true });
  if (!comment) throw new ApiError(404, 'Comment not found');
  return ApiResponse.success(res, { message: 'Comment approved', data: { comment } });
});

// @route   DELETE /api/blog/comments/:commentId
// @access  Private (owner) or Admin
export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await BlogComment.findById(req.params.commentId);
  if (!comment) throw new ApiError(404, 'Comment not found');

  const isOwner = comment.user.toString() === req.user.id;
  if (!isOwner && req.user.role !== 'admin') throw new ApiError(403, 'Not authorized');

  await comment.deleteOne();
  return ApiResponse.success(res, { message: 'Comment deleted' });
});

export default {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  getComments,
  approveComment,
  deleteComment
};