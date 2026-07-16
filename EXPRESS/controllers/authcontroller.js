import User from "../models/user.js";
import asyncHandler from "../utils/asynchandler.js";
import { ApiResponse, ApiError } from "../utils/apiresponse.js";
import generateToken from "../utils/generatetoken.js";


const sendTokenResponse = (user, statusCode, res, message) => {
  const token = generateToken(user._id, user.role);

  const cookieOptions = {
    expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  };

  res.cookie('jwt', token, cookieOptions);

 
  const safeUser = user.toObject();
  delete safeUser.password;

  return ApiResponse.success(res, {
    statusCode,
    message,
    data: { user: safeUser, token },
  });
};

// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, 'An account with this email already exists');

  const user = await User.create({ name, email, password });

  sendTokenResponse(user, 201, res, 'Account created successfully');
});


export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Incorrect email or password');
  }

  if (!user.isActive) {
    throw new ApiError(401, 'This account has been deactivated');
  }

  sendTokenResponse(user, 200, res, 'Logged in successfully');
});

// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
  });
  return ApiResponse.success(res, { message: 'Logged out successfully' });
});

// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  // req.user was attached by the `protect` middleware
  return ApiResponse.success(res, { data: { user: req.user } });
});

// @route   PATCH /api/auth/update-password
// @access  Private
export const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.comparePassword(currentPassword))) {
    throw new ApiError(401, 'Current password is incorrect');
  }

  user.password = newPassword;
  user.passwordChangedAt = new Date(Date.now() - 1000); // -1s to avoid JWT-issued-before-save race
  await user.save();

  sendTokenResponse(user, 200, res, 'Password updated successfully');
});




export default {
  register,
  login,
  logout,
  getMe,
  updatePassword
};