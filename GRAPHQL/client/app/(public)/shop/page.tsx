"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SlideIn from "@/components/SlideIn";
import {
  PRODUCTS_QUERY,
  CATEGORIES_QUERY,
  ProductsData,
  ProductsVars,
  CategoriesData,
} from "@/lib/graphql/products";

const SORT_OPTIONS = [
  { value: "FEATURED", label: "Featured" },
  { value: "PRICE_ASC", label: "Price: Low to High" },
  { value: "PRICE_DESC", label: "Price: High to Low" },
  { value: "RATING", label: "Top Rated" },
] as const;

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(400);
  const [sort, setSort] = useState<ProductsVars["sort"]>("FEATURED");

  useEffect(() => {
    const fromUrl = searchParams.get("category");
    if (fromUrl) setActiveCategory(fromUrl.toLowerCase());
  }, [searchParams]);

  const { data: categoryData } = useQuery<CategoriesData>(CATEGORIES_QUERY);

  const { data, loading, error } = useQuery<ProductsData, ProductsVars>(PRODUCTS_QUERY, {
    variables: {
      filter: {
        categorySlug: activeCategory || undefined,
        maxPrice,
      },
      sort,
    },
  });

  const categories = categoryData?.categories ?? [];
  const products = data?.products ?? [];

  return (
    <main>
      <Navbar />

      <div className="px-8 py-10">
        <h1 className="text-3xl font-bold mb-1">Shop</h1>
        <p className="text-slate-500 text-sm mb-8">
          {loading ? "Loading…" : `${products.length} products`}
        </p>

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
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`block text-sm ${
                      activeCategory === cat.slug ? "text-orange-500 font-medium" : "text-slate-500"
                    }`}
                  >
                    {cat.name} ({cat.productCount})
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
                onChange={(e) => setSort(e.target.value as ProductsVars["sort"])}
                className="text-sm border border-slate-200 rounded-md px-3 py-2 text-slate-600"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <p className="text-red-500 text-sm py-16 text-center">
                Couldn&apos;t load products: {error.message}
              </p>
            )}

            {!error && !loading && products.length === 0 && (
              <p className="text-slate-400 text-sm py-16 text-center">
                No products match your filters.
              </p>
            )}

            {!error && products.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((p, i) => (
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