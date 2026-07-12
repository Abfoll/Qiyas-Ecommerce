export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  category: string;
};

export const products: Product[] = [
  { id: "1", name: "Essential Hoodie", price: 59.99, rating: 4.8, reviews: 128, badge: "New", category: "Fashion" },
  { id: "2", name: "Air Max 270", price: 129.99, oldPrice: 159.99, rating: 4.9, reviews: 89, badge: "-20%", category: "Fashion" },
  { id: "3", name: "Wireless Headphones", price: 99.99, rating: 4.7, reviews: 156, badge: "New", category: "Electronics" },
  { id: "4", name: "Smart Watch Series 9", price: 199.99, oldPrice: 234.99, rating: 4.6, reviews: 103, badge: "-15%", category: "Electronics" },
  { id: "5", name: "Stainless Steel Bottle", price: 24.99, rating: 4.8, reviews: 76, badge: "New", category: "Accessories" },
  { id: "6", name: "Aviator Sunglasses", price: 89.99, oldPrice: 99.99, rating: 4.7, reviews: 87, badge: "-10%", category: "Accessories" },
  { id: "7", name: "Classic Hoodie", price: 59.99, rating: 4.9, reviews: 256, badge: "Bestseller", category: "Fashion" },
  { id: "8", name: "Sony WH-1000XM5", price: 349.99, rating: 4.9, reviews: 324, badge: "Bestseller", category: "Electronics" },
  { id: "9", name: "Matte Lipstick Set", price: 34.99, rating: 4.5, reviews: 64, badge: "New", category: "Beauty" },
  { id: "10", name: "Yoga Mat Pro", price: 44.99, rating: 4.6, reviews: 98, category: "Fitness" },
  { id: "11", name: "Ceramic Vase", price: 39.99, rating: 4.4, reviews: 42, category: "Home Decor" },
  { id: "12", name: "Resistance Bands Set", price: 19.99, rating: 4.7, reviews: 112, badge: "New", category: "Fitness" },
  { id: "13", name: "Hydrating Face Serum", price: 28.99, rating: 4.6, reviews: 71, badge: "New", category: "Beauty" },
  { id: "14", name: "Linen Throw Pillow", price: 22.99, rating: 4.3, reviews: 33, category: "Home Decor" },
];

export const categoryList = [
  "Fashion",
  "Electronics",
  "Beauty",
  "Fitness",
  "Home Decor",
  "Accessories",
];