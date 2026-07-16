import Wishlist from "../models/wishlist.js";
import Product from "../models/product.js";
import asyncHandler from "../utils/asynchandler.js";
import { ApiResponse, ApiError } from "../utils/apiresponse.js";

const getOrCreateWishlist = async (userId) => {
  let wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) wishlist = await Wishlist.create({ user: userId, products: [] });
  return wishlist;
};

// @route   GET /api/wishlist
// @access  Private
export const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user.id }).populate(
    'products',
    'name slug price images ratingsAverage'
  );
  return ApiResponse.success(res, { data: { wishlist: wishlist || { products: [] } } });
});

// @route   POST /api/wishlist/:productId
// @access  Private
export const addToWishlist = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) throw new ApiError(404, 'Product not found');

  const wishlist = await getOrCreateWishlist(req.user.id);
  if (!wishlist.products.some((p) => p.toString() === product._id.toString())) {
    wishlist.products.push(product._id);
    await wishlist.save();
  }

  return ApiResponse.success(res, { message: 'Added to wishlist', data: { wishlist } });
});

// @route   DELETE /api/wishlist/:productId
// @access  Private
export const removeFromWishlist = asyncHandler(async (req, res) => {
  const wishlist = await getOrCreateWishlist(req.user.id);
  wishlist.products = wishlist.products.filter((p) => p.toString() !== req.params.productId);
  await wishlist.save();

  return ApiResponse.success(res, { message: 'Removed from wishlist', data: { wishlist } });
});
export default {
  getWishlist,
  addToWishlist,
  removeFromWishlist
};