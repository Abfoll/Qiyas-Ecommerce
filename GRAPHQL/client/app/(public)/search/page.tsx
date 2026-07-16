"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SlideIn from "@/components/SlideIn";
import { PRODUCTS_QUERY, ProductsData, ProductsVars } from "@/lib/graphql/products";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const trimmed = query.trim();

  const { data, loading, error } = useQuery<ProductsData, ProductsVars>(PRODUCTS_QUERY, {
    variables: { filter: { search: trimmed } },
    skip: trimmed === "",
  });

  const results = data?.products ?? [];

  return (
    <main>
      <Navbar />

      <div className="px-8 py-10">
        <h1 className="text-3xl font-bold mb-6">Search</h1>

        <div className="relative max-w-lg mb-10">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products or categories..."
            className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-400"
          />
        </div>

        {trimmed === "" && (
          <p className="text-slate-400 text-sm">Start typing to search the catalog.</p>
        )}

        {trimmed !== "" && loading && <p className="text-slate-400 text-sm">Searching…</p>}

        {trimmed !== "" && error && (
          <p className="text-red-500 text-sm">Search failed: {error.message}</p>
        )}

        {trimmed !== "" && !loading && !error && results.length === 0 && (
          <p className="text-slate-400 text-sm">No results for &ldquo;{query}&rdquo;.</p>
        )}

        {results.length > 0 && (
          <>
            <p className="text-slate-500 text-sm mb-4">{results.length} results</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {results.map((p, i) => (
                <SlideIn key={p.id} delay={(i % 8) * 70}>
                  <ProductCard product={p} />
                </SlideIn>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}