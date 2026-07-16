/**
 * Seeds NovaTrend's New Arrivals + Best Sellers products via the GraphQL API.
 *
 * NOTE: Your CreateProduct mutation only accepts:
 * name, description, price, oldPrice, badge, stock, images, categoryId.
 * It does NOT accept rating or reviewsCount — so the star ratings from the
 * mockup can't be set this way yet.
 *
 * SECURITY: this file has your admin token hardcoded below. Don't commit it
 * to git or share it — delete the file (or strip the token) once you're done.
 */

const API_URL = "http://localhost:4000/graphql";
const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTU1ZmRiODYwOWNmZjk0NThjYjFmZDEiLCJlbWFpbCI6ImFiZW5lemVydGVrZXRlbDdAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzg0MTU0MTgxLCJleHAiOjE3ODQ3NTg5ODF9.htwKG_9maKFTnJErtEWP4m7Q4GDstBi0KMlzOl4FhCU";
const CATEGORY_ID = "6a55fdb8609cff9458cb1fd1";

async function gql(query, variables) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ADMIN_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error("GraphQL error:", JSON.stringify(json.errors, null, 2));
  }
  return json.data;
}

const CREATE_PRODUCT = `
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      badge
    }
  }
`;

const newArrivals = [
  { name: "Essential Hoodie", price: 59.99, badge: "New", stock: 40, images: ["/image/essential-hoodie.jpg"] },
  { name: "Air Max 270", price: 129.99, oldPrice: 159.99, badge: "New", stock: 25, images: ["/image/air-max-270.jpg"] },
  { name: "Wireless Headphones", price: 99.99, badge: "New", stock: 30, images: ["/image/wireless-headphone.jpg"] },
  { name: "Smart Watch Series 9", price: 199.99, oldPrice: 234.99, badge: "New", stock: 20, images: ["/image/smart-watch-2.jpg"] },
  { name: "Stainless Steel Bottle", price: 24.99, badge: "New", stock: 60, images: ["/image/water-bottle.jpg"] },
  { name: "Aviator Sunglasses", price: 89.99, oldPrice: 99.99, badge: "New", stock: 35, images: ["/image/aviator-sunglass.jpg"] },
];

const bestSellers = [
  { name: "Classic Hoodie", price: 59.99, badge: "Bestseller", stock: 40, images: ["/image/essential-hoodie.jpg"] },
  { name: "Air Max 270", price: 129.99, badge: "Bestseller", stock: 25, images: ["/image/air-max-23.jpg"] },
  { name: "Sony WH-1000XM5", price: 349.99, badge: "Bestseller", stock: 15, images: ["/image/Wirless-Headphone.jpg"] },
];

async function run() {
  for (const p of [...newArrivals, ...bestSellers]) {
    const data = await gql(CREATE_PRODUCT, {
      input: { ...p, categoryId: CATEGORY_ID },
    });
    if (data?.createProduct) {
      console.log(`Created: ${data.createProduct.name} (${data.createProduct.badge})`);
    }
  }
}

run();

