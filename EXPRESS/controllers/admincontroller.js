import User from '../models/user.js';
import Product from '../models/product.js';
import Order from '../models/order.js';
import asyncHandler from '../utils/asynchandler.js';
import { ApiResponse } from '../utils/apiresponse.js';


export const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalUsers, totalProducts, totalOrders, revenueResult, recentOrders, lowStockProducts] = await Promise.all(
    [
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([{ $match: { isPaid: true } }, { $group: { _id: null, total: { $sum: '$totalPrice' } } }]),
      Order.find().populate('user', 'name email').sort('-createdAt').limit(5),
      Product.find({ stock: { $lte: 5 }, isActive: true }).select('name stock').limit(10),
    ]
  );

  const totalRevenue = revenueResult[0]?.total || 0;

  const ordersByStatus = await Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);

  return ApiResponse.success(res, {
    data: {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      ordersByStatus,
      recentOrders,
      lowStockProducts,
    },
  });
});


export default {
  getDashboardStats
};
