"use client";

import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SlideIn from "@/components/SlideIn";
import { CATEGORIES_QUERY, CategoriesData } from "@/lib/graphql/products";

export default function CategoriesPage() {
  const { data, loading, error } = useQuery<CategoriesData>(CATEGORIES_QUERY);
  const categories = data?.categories ?? [];

  return (
    <main>
      <Navbar />

      <div className="px-8 py-10">
        <h1 className="text-3xl font-bold mb-1">Categories</h1>
        <p className="text-slate-500 text-sm mb-8">Browse products by category</p>

        {loading && <p className="text-slate-400 text-sm">Loading…</p>}
        {error && <p className="text-red-500 text-sm">Couldn&apos;t load categories: {error.message}</p>}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <SlideIn key={cat.id} delay={i * 90}>
              <Link
                href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                className="block bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:border-orange-400 transition-colors"
              >
                <div className="h-36 bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                  image
                </div>
                <div className="p-4">
                  <p className="font-medium">{cat.name}</p>
                  <p className="text-xs text-slate-500">{cat.productCount} products</p>
                </div>
              </Link>
            </SlideIn>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}