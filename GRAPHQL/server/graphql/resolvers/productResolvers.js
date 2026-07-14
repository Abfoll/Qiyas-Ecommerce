import Product from "../../models/Product.js";
import Category from "../../models/Category.js";
import { requireAdmin } from "../context/index.js";

const SORT_MAP = {
  PRICE_ASC: { price: 1 },
  PRICE_DESC: { price: -1 },
  RATING: { rating: -1 },
  NEWEST: { createdAt: -1 },
  FEATURED: {},
};

export const productResolvers = {
  Query: {
    products: async (_parent, { filter = {}, sort = "FEATURED" }) => {
      const query = {};

      if (filter.categorySlug) {
        const category = await Category.findOne({ slug: filter.categorySlug });
        query.category = category ? category._id : null;
      }
      if (filter.maxPrice != null) {
        query.price = { $lte: filter.maxPrice };
      }
      if (filter.search) {
        query.name = { $regex: filter.search, $options: "i" };
      }

      return Product.find(query).sort(SORT_MAP[sort] || {}).populate("category");
    },

    product: async (_parent, { id }) => {
      return Product.findById(id).populate("category");
    },
  },

  Mutation: {
    createProduct: async (_parent, { input }, context) => {
      requireAdmin(context);
      const product = await Product.create({
        ...input,
        category: input.categoryId,
      });
      return product.populate("category");
    },

    updateProduct: async (_parent, { id, input }, context) => {
      requireAdmin(context);
      const product = await Product.findByIdAndUpdate(
        id,
        { ...input, category: input.categoryId },
        { new: true }
      ).populate("category");
      if (!product) throw new Error("Product not found.");
      return product;
    },

    deleteProduct: async (_parent, { id }, context) => {
      requireAdmin(context);
      const result = await Product.findByIdAndDelete(id);
      return !!result;
    },
  },

  Product: {
    id: (parent) => parent._id.toString(),
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
};