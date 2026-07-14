import Category from "../../models/Category.js";
import Product from "../../models/Product.js";
import { requireAdmin } from "../context/index.js";

export const categoryResolvers = {
  Query: {
    categories: async () => {
      return Category.find().sort({ name: 1 });
    },
    category: async (_parent, { slug }) => {
      return Category.findOne({ slug });
    },
  },

  Mutation: {
    createCategory: async (_parent, { name, slug, image }, context) => {
      requireAdmin(context);
      return Category.create({ name, slug, image });
    },
  },

  Category: {
    id: (parent) => parent._id.toString(),
    productCount: async (parent) => {
      return Product.countDocuments({ category: parent._id });
    },
  },
};