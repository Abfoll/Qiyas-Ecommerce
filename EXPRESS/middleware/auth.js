import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asynchandler.js";
import { ApiError } from "../utils/apiresponse.js";
import User from "../models/user.js";


const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    throw new ApiError(401, 'You are not logged in. Please log in to get access.');
  }

  // Throws JsonWebTokenError / TokenExpiredError if invalid -> caught by asyncHandler -> errorHandler
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    throw new ApiError(401, 'The user belonging to this token no longer exists.');
  }

  if (!currentUser.isActive) {
    throw new ApiError(401, 'This account has been deactivated.');
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    throw new ApiError(401, 'Password was recently changed. Please log in again.');
  }

  req.user = currentUser;
  next();
});


const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    throw new ApiError(403, 'You do not have permission to perform this action.');
  }
  next();
};

export { protect, restrictTo };
