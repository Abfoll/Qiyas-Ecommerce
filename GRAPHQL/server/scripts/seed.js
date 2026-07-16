import "dotenv/config";
import { connectDB } from "../config/database.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

const categories = [
  { name: "Fashion", slug: "fashion", image: "/images/fashion.jpg" },
  { name: "Electronics", slug: "electronics", image: "/images/electronics.jpg" },
  { name: "Beauty", slug: "beauty", image: "/images/beauty.jpg" },
  { name: "Fitness", slug: "fitness", image: "/images/fitness.jpg" },
  { name: "Home Decor", slug: "home-decor", image: "/images/home-decor.jpg" },
  { name: "Accessories", slug: "accessories", image: "/images/accessories.jpg" },
];

const products = [
  {
    name: "Essential Hoodie",
    price: 59.99,
    badge: "New",
    stock: 40,
    categorySlug: "fashion",
    images: ["/images/essential-hoodie.jpg"],
  },
  {
    name: "air-max-270",
    price: 129.99,
    oldPrice: 159.99,
    badge: "Bestseller",
    stock: 25,
    categorySlug: "fashion",
    images: [
      "/images/air-max-270.jpg",
      //   "/images/air-max-2.jpg",
      //   "/images/air-max-23.jpg",
      //   "/images/best-seller-air-max.jpg",
    ],
  },
  {
    name: "Classic Hoodie",
    price: 59.99,
    badge: "Bestseller",
    stock: 30,
    categorySlug: "fashion",
    images: ["/images/essential-hoodie.jpg"],
  },
  {
    name: "Wireless Headphones",
    price: 99.99,
    badge: "New",
    stock: 35,
    categorySlug: "electronics",
    images: ["/images/wireless-headphone.jpg"],
  },
  {
    name: "Smart Watch Series 9",
    price: 199.99,
    oldPrice: 234.99,
    stock: 20,
    categorySlug: "electronics",
    images: ["/images/smart-watch.jpg", "/images/smart-watch-2.jpg"],
  },
  {
    name: "Sony WH-1000XM5",
    price: 349.99,
    badge: "Bestseller",
    stock: 15,
    categorySlug: "electronics",
    images: ["/images/Wirless-Headphone.jpg"],
  },
  {
    name: "Stainless Steel Bottle",
    price: 24.99,
    badge: "New",
    stock: 60,
    categorySlug: "accessories",
    images: ["/images/water-bottle.jpg"],
  },
  {
    name: "Aviator Sunglasses",
    price: 89.99,
    oldPrice: 99.99,
    stock: 28,
    categorySlug: "accessories",
    images: ["/images/aviator-sunglass.jpg"],
  },
  {
    name: "Matte Lipstick Set",
    price: 34.99,
    badge: "New",
    stock: 45,
    categorySlug: "beauty",
    images: ["/images/girl-photo.png"],
  },
  {
    name: "Hydrating Face Serum",
    price: 28.99,
    badge: "New",
    stock: 38,
    categorySlug: "beauty",
    images: ["/images/beauty.jpg"],
  },
  {
    name: "Yoga Mat Pro",
    price: 44.99,
    stock: 22,
    categorySlug: "fitness",
    images: ["/images/fitness.jpg"],
  },
  {
    name: "Resistance Bands Set",
    price: 19.99,
    badge: "New",
    stock: 50,
    categorySlug: "fitness",
    images: ["/images/fitness.jpg"],
  },
  {
    name: "Ceramic Vase",
    price: 39.99,
    stock: 18,
    categorySlug: "home-decor",
    images: ["/images/home-decor.jpg"],
  },
  {
    name: "Linen Throw Pillow",
    price: 22.99,
    stock: 32,
    categorySlug: "home-decor",
    images: ["/images/home-decor.jpg"],
  },
];

async function seed() {
  await connectDB();

  console.log("Clearing existing categories and products...");
  await Product.deleteMany({});
  await Category.deleteMany({});

  console.log("Creating categories...");
  const createdCategories = await Category.insertMany(categories);
  const categoryBySlug = Object.fromEntries(
    createdCategories.map((c) => [c.slug, c._id])
  );

  console.log("Creating products...");
  const productsToInsert = products.map((p) => ({
    name: p.name,
    price: p.price,
    oldPrice: p.oldPrice,
    badge: p.badge,
    stock: p.stock,
    rating: Number((4.3 + Math.random() * 0.6).toFixed(1)),
    reviewsCount: Math.floor(40 + Math.random() * 280),
    images: p.images,
    category: categoryBySlug[p.categorySlug],
  }));

  await Product.insertMany(productsToInsert);

  console.log(`Done: ${createdCategories.length} categories, ${productsToInsert.length} products.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});