import ProductCard from "./ProductCard";
import SlideIn from "./SlideIn";
import { products } from "@/lib/products";

const newArrivals = products.filter((p) => p.badge === "New").slice(0, 6);

export default function NewArrivals() {
  return (
    <section className="px-8 py-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">New Arrivals</h2>
        <a href="#" className="text-sm text-orange-500 hover:underline">
          View All New Arrivals →
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {newArrivals.map((p, i) => (
          <SlideIn key={p.id} delay={i * 100}>
            <ProductCard product={p} />
          </SlideIn>
        ))}
      </div>
    </section>
  );
}