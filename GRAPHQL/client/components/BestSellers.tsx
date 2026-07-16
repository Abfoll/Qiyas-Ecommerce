"use client";

import { useQuery } from "@apollo/client/react";
import SlideIn from "./SlideIn";
import { PRODUCTS_QUERY } from "@/lib/graphql/products";
import type { ProductsData, ProductsVars, BackendProduct } from "@/lib/graphql/products";

export default function BestSellers() {
  const { data, loading } = useQuery<ProductsData, ProductsVars>(PRODUCTS_QUERY, {
    variables: { sort: "RATING" },
  });

  const all = data?.products ?? [];
  const tagged = all.filter((p) => p.badge === "Bestseller");

  // Backfill with other products so the section isn't sparse while the
  // catalog is small - real "Bestseller" tagged items always come first.
  const seen = new Set(tagged.map((p) => p.id));
  const backfill = all.filter((p) => !seen.has(p.id));
  const items: BackendProduct[] = [...tagged, ...backfill].slice(0, 3);

  if (!loading && items.length === 0) return null;

  return (
    <section className="px-8 py-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Best Sellers</h2>
        <a href="/shop" className="text-sm text-orange-500 hover:underline">
          View All Best Sellers →
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {items.map((p, i) => (
          <SlideIn key={p.id} delay={i * 120}>
            <div className="bg-white rounded-lg border border-slate-200 p-4 flex gap-4 shadow-sm">
              <div className="w-24 h-24 shrink-0 bg-slate-100 rounded flex items-center justify-center text-slate-400 text-xs overflow-hidden">
                {p.images?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  "image"
                )}
              </div>
              <div className="flex-1">
                {p.badge && (
                  <span className="text-[10px] bg-orange-500 text-white px-2 py-1 rounded font-semibold">
                    {p.badge}
                  </span>
                )}
                <p className="font-medium mt-2">{p.name}</p>
                <p className="text-xs text-slate-500 mb-1">
                  ★ {p.rating} ({p.reviewsCount})
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-semibold">${p.price}</span>
                  <button className="bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded hover:bg-slate-700 transition-colors">
                    Quick Add
                  </button>
                </div>
              </div>
            </div>
          </SlideIn>
        ))}
      </div>
    </section>
  );
}