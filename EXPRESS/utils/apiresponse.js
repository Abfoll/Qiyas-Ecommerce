/**
 * Standard API Response Formatter
 * Every response in this app has the SAME shape, so the frontend never
 * has to guess the structure of a response.
 *
 * Success -> { success: true, message, data, meta }
 * Error   -> { success: false, message, errors }
 */

class ApiResponse {
  static success(res, { statusCode = 200, message = 'Success', data = null, meta = null }) {
    const body = { success: true, message, data };
    if (meta) body.meta = meta;
    return res.status(statusCode).json(body);
  }

  static error(res, { statusCode = 500, message = 'Something went wrong', errors = null }) {
    const body = { success: false, message };
    if (errors) body.errors = errors;
    return res.status(statusCode).json(body);
  }
}

/**
 * Custom Error class that carries an HTTP status code.
 * We `throw` this anywhere in controllers/services and the global
 * errorHandler middleware knows exactly what status + message to send.
 */
class ApiError extends Error {
  constructor(statusCode, message, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true; // distinguishes "expected" errors from bugs
    Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiResponse, ApiError };
