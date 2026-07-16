"use client";

import { useQuery } from "@apollo/client/react";
import ProductCard from "./ProductCard";
import SlideIn from "./SlideIn";
import { PRODUCTS_QUERY } from "@/lib/graphql/products";
import type { ProductsData, ProductsVars, BackendProduct } from "@/lib/graphql/products";

export default function NewArrivals() {
  const { data, loading } = useQuery<ProductsData, ProductsVars>(PRODUCTS_QUERY, {
    variables: { sort: "NEWEST" },
  });

  const all = data?.products ?? [];
  const tagged = all.filter((p) => p.badge === "New");

  // Backfill with other products so the section isn't sparse while the
  // catalog is small - real "New" tagged items always come first.
  const seen = new Set(tagged.map((p) => p.id));
  const backfill = all.filter((p) => !seen.has(p.id));
  const items: BackendProduct[] = [...tagged, ...backfill].slice(0, 6);

  if (!loading && items.length === 0) return null;

  return (
    <section className="px-8 py-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">New Arrivals</h2>
        <a href="/new-arrivals" className="text-sm text-orange-500 hover:underline">
          View All New Arrivals →
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {items.map((p, i) => (
          <SlideIn key={p.id} delay={i * 100}>
            <ProductCard product={p} />
          </SlideIn>
        ))}
      </div>
    </section>
  );
}