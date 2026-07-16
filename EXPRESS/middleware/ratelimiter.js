import rateLimit from "express-rate-limit";
import { ApiResponse } from "../utils/apiresponse.js";

const handler = (req, res) => {
  return ApiResponse.error(res, { statusCode: 429, message: 'Too many requests. Please try again later.' });
};

// General limiter: applied to all /api routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});

// Stricter limiter for auth endpoints — slows down brute-force login/register attempts
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
  skipSuccessfulRequests: true, // only counts failed attempts against the limit
});

export { apiLimiter, authLimiter };
