import User from "../models/user.js";
import asyncHandler from "../utils/asynchandler.js";
import { ApiResponse, ApiError } from "../utils/apiresponse.js";

// @route   PATCH /api/users/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  // Whitelist fields — never let a user mass-assign role/password through here
  const allowed = ['name', 'phone'];
  const updates = {};
  allowed.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  const user = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true,
  });

  return ApiResponse.success(res, { message: 'Profile updated', data: { user } });
});

// @route   GET /api/users (admin only)
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 20, 100);
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find().skip(skip).limit(limit).sort('-createdAt'),
    User.countDocuments(),
  ]);

  return ApiResponse.success(res, {
    data: { users },
    meta: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

// @route   GET /api/users/:id (admin only)
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, 'User not found');
  return ApiResponse.success(res, { data: { user } });
});

// @route   PATCH /api/users/:id/deactivate (admin only)
// @access  Private/Admin
export const deactivateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!user) throw new ApiError(404, 'User not found');
  return ApiResponse.success(res, { message: 'User deactivated', data: { user } });
});



export default {
  updateProfile,
  getAllUsers,
  getUserById,
  deactivateUser
 
};
