import logger from "../utils/logger.js";
import { ApiResponse, ApiError } from "../utils/apiresponse.js";

const normalizeError = (err) => {
  // Mongoose bad ObjectId (e.g. /api/products/123-invalid)
  if (err.name === 'CastError') {
    return new ApiError(400, `Invalid ${err.path}: ${err.value}`);
  }

  // Mongoose duplicate key (e.g. registering with an email that exists)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return new ApiError(409, `${field} '${err.keyValue[field]}' already exists`);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
    return new ApiError(422, 'Validation failed', errors);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return new ApiError(401, 'Invalid token. Please log in again.');
  }
  if (err.name === 'TokenExpiredError') {
    return new ApiError(401, 'Your session has expired. Please log in again.');
  }

  if (err instanceof ApiError) return err;

  // Anything else = unexpected bug, not the user's fault
  return new ApiError(500, 'Internal server error');
};


const errorHandler = (err, req, res, next) => {
  const normalized = normalizeError(err);

  // Log full detail server-side (never expose stack traces to the client)
  if (normalized.statusCode >= 500) {
    logger.error(`${req.method} ${req.originalUrl} -> ${err.stack || err.message}`);
  } else {
    logger.warn(`${req.method} ${req.originalUrl} -> ${normalized.message}`);
  }

  return ApiResponse.error(res, {
    statusCode: normalized.statusCode,
    message: normalized.message,
    errors: normalized.errors,
  });
};


const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

export { errorHandler, notFound };
