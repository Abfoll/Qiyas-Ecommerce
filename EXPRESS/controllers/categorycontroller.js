import Category from "../models/category.js";
import Product from "../models/product.js";
import asyncHandler from "../utils/asynchandler.js";
import { ApiResponse, ApiError } from "../utils/apiresponse.js";
import { uploadBuffer, deleteImage } from "../services/uploadservice.js";

// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true }).populate('parent', 'name slug');
  return ApiResponse.success(res, { data: { categories } });
});

// @route   GET /api/categories/:slug
// @access  Public
export const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug });
  if (!category) throw new ApiError(404, 'Category not found');
  return ApiResponse.success(res, { data: { category } });
});

// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  const payload = { ...req.body };

  if (req.file) {
    const uploaded = await uploadBuffer(req.file.buffer, 'ecommerce/categories');
    payload.image = uploaded;
  }

  const category = await Category.create(payload);
  return ApiResponse.success(res, { statusCode: 201, message: 'Category created', data: { category } });
});

// @route   PATCH /api/categories/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new ApiError(404, 'Category not found');

  if (req.file) {
    if (category.image?.publicId) await deleteImage(category.image.publicId);
    req.body.image = await uploadBuffer(req.file.buffer, 'ecommerce/categories');
  }

  Object.assign(category, req.body);
  await category.save();

  return ApiResponse.success(res, { message: 'Category updated', data: { category } });
});

// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new ApiError(404, 'Category not found');

  const productCount = await Product.countDocuments({ category: category._id });
  if (productCount > 0) {
    throw new ApiError(400, `Cannot delete: ${productCount} product(s) still use this category`);
  }

  if (category.image?.publicId) await deleteImage(category.image.publicId);
  await category.deleteOne();

  return ApiResponse.success(res, { message: 'Category deleted' });
});
export default {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
};