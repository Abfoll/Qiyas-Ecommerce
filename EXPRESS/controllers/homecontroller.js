import { ApiResponse } from '../utils/apiresponse.js';

// @route   GET /api/health
export const healthCheck = (req, res) => {
  return ApiResponse.success(res, {
    message: 'API is healthy',
    data: { uptime: process.uptime(), timestamp: new Date().toISOString() },
  });
};
export default {
  healthCheck
};