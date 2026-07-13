import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SlideIn from "@/components/SlideIn";
import { categoryList, products } from "@/lib/products";

export default function CategoriesPage() {
  return (
    <main>
      <Navbar />

      <div className="px-8 py-10">
        <h1 className="text-3xl font-bold mb-1">Categories</h1>
        <p className="text-slate-500 text-sm mb-8">Browse products by category</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {categoryList.map((cat, i) => {
            const count = products.filter((p) => p.category === cat).length;
            return (
              <SlideIn key={cat} delay={i * 90}>
                <Link
                  href={`/shop?category=${encodeURIComponent(cat)}`}
                  className="block bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:border-orange-400 transition-colors"
                >
                  <div className="h-36 bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                    image
                  </div>
                  <div className="p-4">
                    <p className="font-medium">{cat}</p>
                    <p className="text-xs text-slate-500">{count} products</p>
                  </div>
                </Link>
              </SlideIn>
            );
          })}
        </div>
      </div>

      <Footer />
    </main>
  );
}