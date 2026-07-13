"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SlideIn from "@/components/SlideIn";
import { products, categoryList } from "@/lib/products";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(400);
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  useEffect(() => {
    const fromUrl = searchParams.get("category");
    if (fromUrl && categoryList.includes(fromUrl)) {
      setActiveCategory(fromUrl);
    }
  }, [searchParams]);

  let filtered = products.filter(
    (p) => (!activeCategory || p.category === activeCategory) && p.price <= maxPrice
  );

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <main>
      <Navbar />

      <div className="px-8 py-10">
        <h1 className="text-3xl font-bold mb-1">Shop</h1>
        <p className="text-slate-500 text-sm mb-8">{filtered.length} products</p>

        <div className="grid md:grid-cols-[220px_1fr] gap-8">
          <aside className="space-y-8">
            <div>
              <p className="font-medium text-sm mb-3">Category</p>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`block text-sm ${
                    activeCategory === null ? "text-orange-500 font-medium" : "text-slate-500"
                  }`}
                >
                  All
                </button>
                {categoryList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`block text-sm ${
                      activeCategory === cat ? "text-orange-500 font-medium" : "text-slate-500"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-medium text-sm mb-3">Max price: ${maxPrice}</p>
              <input
                type="range"
                min={10}
                max={400}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>
          </aside>

          <div>
            <div className="flex justify-end mb-4">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="text-sm border border-slate-200 rounded-md px-3 py-2 text-slate-600"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <p className="text-slate-400 text-sm py-16 text-center">
                No products match your filters.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filtered.map((p, i) => (
                  <SlideIn key={p.id} delay={(i % 6) * 80}>
                    <ProductCard product={p} />
                  </SlideIn>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}