"use client";

import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import SlideIn from "./SlideIn";
import { CATEGORIES_QUERY } from "@/lib/graphql/products";
import type { CategoriesData } from "@/lib/graphql/products";

export default function Categories() {
  const { data, loading } = useQuery<CategoriesData>(CATEGORIES_QUERY);
  const categories = data?.categories ?? [];

  if (!loading && categories.length === 0) return null;

  return (
    <section className="px-8 py-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Shop by Categories</h2>
        <Link href="/categories" className="text-sm text-orange-500 hover:underline">
          View All Categories →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {categories.map((cat, i) => (
          <SlideIn key={cat.id} delay={i * 80}>
            <Link
              href={`/shop?category=${encodeURIComponent(cat.slug)}`}
              className="block bg-white rounded-lg overflow-hidden border border-slate-200 hover:border-orange-400 transition-colors shadow-sm"
            >
              <div className="h-28 bg-slate-100 flex items-center justify-center text-slate-400 text-xs overflow-hidden">
                {cat.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                ) : (
                  "image"
                )}
              </div>
              <div className="p-3">
                <p className="font-medium text-sm">{cat.name}</p>
                <p className="text-xs text-slate-500">Shop Now</p>
              </div>
            </Link>
          </SlideIn>
        ))}
      </div>
    </section>
  );
}