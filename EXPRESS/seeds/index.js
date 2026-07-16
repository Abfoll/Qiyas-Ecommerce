import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User from "../models/user.js";
import Category from "../models/category.js";
import Product from "../models/product.js";
import logger from "../utils/logger.js";

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  logger.info("Connected to DB for seeding");

  await Promise.all([
    User.deleteMany(),
    Category.deleteMany(),
    Product.deleteMany(),
  ]);

  const admin = await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: "admin12345",
    role: "admin",
  });


  
  // CLOTHING CATEGORY TREE
  

  const men = await Category.create({
    name: "Men",
    description: "Men clothing collection",
  });

  const women = await Category.create({
    name: "Women",
    description: "Women clothing collection",
  });

  const kids = await Category.create({
    name: "Kids",
    description: "Kids clothing collection",
  });


  const categories = await Category.insertMany([
    // Men
    {
      name: "T-Shirts",
      description: "Men casual t-shirts",
      parent: men._id,
    },
    {
      name: "Shirts",
      description: "Men formal and casual shirts",
      parent: men._id,
    },
    {
      name: "Jeans",
      description: "Men denim jeans",
      parent: men._id,
    },
    {
      name: "Jackets",
      description: "Men jackets and outerwear",
      parent: men._id,
    },


    // Women
    {
      name: "Dresses",
      description: "Women dresses",
      parent: women._id,
    },
    {
      name: "Skirts",
      description: "Women skirts",
      parent: women._id,
    },
    {
      name: "Tops",
      description: "Women tops and blouses",
      parent: women._id,
    },
    {
      name: "Handbags",
      description: "Women handbags and accessories",
      parent: women._id,
    },


    // Kids
    {
      name: "Boys",
      description: "Boys clothing",
      parent: kids._id,
    },
    {
      name: "Girls",
      description: "Girls clothing",
      parent: kids._id,
    },
  ]);


 
  // PRODUCTS


  await Product.insertMany([
    {
      name: "Classic Cotton T-Shirt",
      description:
        "Soft breathable 100% cotton t-shirt suitable for everyday wear.",
      price: 19.99,
      comparePrice: 29.99,
      category: categories[0]._id,
      brand: "WearWell",
      stock: 200,
      variants: [
        {
          name: "Size",
          options: ["S", "M", "L", "XL"],
        },
        {
          name: "Color",
          options: ["Black", "White", "Blue"],
        },
      ],
      images: [],
      isFeatured: true,
      createdBy: admin._id,
    },

    {
      name: "Premium Denim Jeans",
      description:
        "Comfortable slim fit denim jeans with premium quality fabric.",
      price: 49.99,
      category: categories[2]._id,
      brand: "UrbanStyle",
      stock: 100,
      variants: [
        {
          name: "Size",
          options: ["30", "32", "34", "36"],
        },
      ],
      images: [],
      createdBy: admin._id,
    },

    {
      name: "Elegant Women Dress",
      description:
        "Beautiful summer dress designed with comfortable lightweight material.",
      price: 59.99,
      category: categories[4]._id,
      brand: "FashionLine",
      stock: 80,
      variants: [
        {
          name: "Size",
          options: ["S", "M", "L"],
        },
      ],
      images: [],
      isFeatured: true,
      createdBy: admin._id,
    },

    {
      name: "Luxury Leather Handbag",
      description:
        "Premium leather handbag suitable for daily and formal occasions.",
      price: 79.99,
      category: categories[7]._id,
      brand: "LuxuryWear",
      stock: 40,
      images: [],
      createdBy: admin._id,
    },

    {
      name: "Kids Boys Jacket",
      description:
        "Warm and comfortable jacket designed for boys.",
      price: 39.99,
      category: categories[8]._id,
      brand: "KidsWear",
      stock: 60,
      images: [],
      createdBy: admin._id,
    },
  ]);


  logger.info(
    "Seed complete: 1 admin, clothing categories, and sample products created"
  );

  logger.info(
    "Admin login -> email: admin@example.com / password: admin12345"
  );


  await mongoose.disconnect();
  process.exit(0);
};


run().catch((err) => {
  logger.error(`Seeding failed: ${err.message}`);
  process.exit(1);
});