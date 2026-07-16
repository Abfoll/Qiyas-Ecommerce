import Product from "../models/product.js";
import Review from "../models/review.js";
import asyncHandler from "../utils/asynchandler.js";
import { ApiResponse, ApiError } from "../utils/apiresponse.js";
import { uploadMultiple, deleteImage } from "../services/uploadservice.js";

// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const { keyword, category, minPrice, maxPrice, sort, featured, brand } = req.query;

  const filter = { isActive: true };
  if (keyword) filter.$text = { $search: keyword };
  if (category) filter.category = category;
  if (brand) filter.brand = brand;
  if (featured) filter.isFeatured = featured === 'true';
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 20, 100);
  const skip = (page - 1) * limit;

  const sortMap = {
    price_asc: 'price',
    price_desc: '-price',
    newest: '-createdAt',
    rating: '-ratingsAverage',
  };
  const sortBy = sortMap[sort] || '-createdAt';

  const [products, total] = await Promise.all([
    Product.find(filter).populate('category', 'name slug').sort(sortBy).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);

  return ApiResponse.success(res, {
    data: { products },
    meta: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

// @route   GET /api/products/:slug
// @access  Public
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true })
    .populate('category', 'name slug')
    .populate({ path: 'reviews', populate: { path: 'user', select: 'name' } });

  if (!product) throw new ApiError(404, 'Product not found');
  return ApiResponse.success(res, { data: { product } });
});

// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const payload = { ...req.body, createdBy: req.user.id };

  if (req.files && req.files.length > 0) {
    payload.images = await uploadMultiple(req.files, 'ecommerce/products');
  }

  const product = await Product.create(payload);
  return ApiResponse.success(res, { statusCode: 201, message: 'Product created', data: { product } });
});

// @route   PATCH /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');

  if (req.files && req.files.length > 0) {
    const uploaded = await uploadMultiple(req.files, 'ecommerce/products');
    product.images.push(...uploaded); // new images are appended; removal handled via a separate endpoint if needed
  }

  Object.assign(product, req.body);
  await product.save();

  return ApiResponse.success(res, { message: 'Product updated', data: { product } });
});

// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');

  await Promise.all(product.images.map((img) => deleteImage(img.publicId)));
  await Review.deleteMany({ product: product._id });
  await product.deleteOne();

  return ApiResponse.success(res, { message: 'Product deleted' });
});

// ---------- Reviews (nested resource under a product) ----------

// @route   POST /api/products/:id/reviews
// @access  Private
export const addReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');

  const existing = await Review.findOne({ product: product._id, user: req.user.id });
  if (existing) throw new ApiError(409, 'You have already reviewed this product');

  const review = await Review.create({
    product: product._id,
    user: req.user.id,
    rating: req.body.rating,
    comment: req.body.comment,
  });

  return ApiResponse.success(res, { statusCode: 201, message: 'Review added', data: { review } });
});

// @route   GET /api/products/:id/reviews
// @access  Public
export const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.id }).populate('user', 'name');
  return ApiResponse.success(res, { data: { reviews } });
});

// @route   DELETE /api/products/:id/reviews/:reviewId
// @access  Private (owner) or Admin
export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) throw new ApiError(404, 'Review not found');

  const isOwner = review.user.toString() === req.user.id;
  if (!isOwner && req.user.role !== 'admin') {
    throw new ApiError(403, 'You can only delete your own review');
  }

  await Review.findByIdAndDelete(review._id); // triggers post('findOneAndDelete') -> recalculates rating

  return ApiResponse.success(res, { message: 'Review deleted' });
});
export default {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getProductReviews,
  deleteReview
};