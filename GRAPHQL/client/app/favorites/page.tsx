"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SlideIn from "@/components/SlideIn";
import { products } from "@/lib/products";

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(["2", "8"]);

  const favorites = products.filter((p) => favoriteIds.includes(p.id));

  function removeFavorite(id: string) {
    setFavoriteIds((prev) => prev.filter((f) => f !== id));
  }

  return (
    <main>
      <Navbar />

      <div className="px-8 py-10">
        <h1 className="text-3xl font-bold mb-1">Favorites</h1>
        <p className="text-slate-500 text-sm mb-8">
          {favorites.length === 0 ? "No saved items yet" : `${favorites.length} saved items`}
        </p>

        {favorites.length === 0 ? (
          <p className="text-slate-400 text-sm py-16 text-center">
            Items you favorite will show up here.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {favorites.map((p, i) => (
              <SlideIn key={p.id} delay={i * 90}>
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="relative h-40 bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                    image
                    <button
                      onClick={() => removeFavorite(p.id)}
                      className="absolute top-2 right-2 bg-white rounded-full w-7 h-7 flex items-center justify-center text-orange-500 shadow-sm text-sm"
                      aria-label={`Remove ${p.name} from favorites`}
                    >
                      ♥
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="font-medium text-sm mb-1">{p.name}</p>
                    <p className="font-semibold text-sm">${p.price}</p>
                  </div>
                </div>
              </SlideIn>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}