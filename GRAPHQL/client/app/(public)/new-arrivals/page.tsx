"use client";

import { useQuery } from "@apollo/client/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SlideIn from "@/components/SlideIn";
import { PRODUCTS_QUERY, ProductsData, ProductsVars } from "@/lib/graphql/products";

export default function NewArrivalsPage() {
  const { data, loading, error } = useQuery<ProductsData, ProductsVars>(PRODUCTS_QUERY, {
    variables: { sort: "NEWEST" },
  });

  const items = (data?.products ?? []).filter((p) => p.badge === "New");

  return (
    <main>
      <Navbar />

      <div className="px-8 py-10">
        <h1 className="text-3xl font-bold mb-1">New Arrivals</h1>
        <p className="text-slate-500 text-sm mb-8">
          {loading ? "Loading…" : `Freshly added — ${items.length} products`}
        </p>

        {error && <p className="text-red-500 text-sm">Couldn&apos;t load products: {error.message}</p>}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((p, i) => (
            <SlideIn key={p.id} delay={i * 90}>
              <ProductCard product={p} />
            </SlideIn>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}