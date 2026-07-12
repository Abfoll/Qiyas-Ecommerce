import SlideIn from "./SlideIn";

const bestSellers = [
  {
    id: "1",
    name: "Classic Hoodie",
    price: 59.99,
    rating: 4.9,
    reviews: 256,
    tag: "Bestseller",
    description: "Premium quality hoodie perfect for everyday wear.",
  },
  {
    id: "2",
    name: "Air Max 270",
    price: 129.99,
    rating: 4.8,
    reviews: 189,
    tag: "Bestseller",
    description: "Iconic comfort meets style.",
  },
  {
    id: "3",
    name: "Sony WH-1000XM5",
    price: 349.99,
    rating: 4.9,
    reviews: 324,
    tag: "Bestseller",
    description: "Industry-leading noise cancellation.",
  },
];

export default function BestSellers() {
  return (
    <section className="px-8 py-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Best Sellers</h2>
        <a href="#" className="text-sm text-orange-500 hover:underline">
          View All Best Sellers →
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {bestSellers.map((p, i) => (
          <SlideIn key={p.id} delay={i * 120}>
            <div className="bg-white rounded-lg border border-slate-200 p-4 flex gap-4 shadow-sm">
              <div className="w-24 h-24 shrink-0 bg-slate-100 rounded flex items-center justify-center text-slate-400 text-xs">
                image
              </div>
              <div className="flex-1">
                <span className="text-[10px] bg-orange-500 px-2 py-1 rounded font-semibold">
                  {p.tag}
                </span>
                <p className="font-medium mt-2">{p.name}</p>
                <p className="text-xs text-slate-500 mb-1">★ {p.rating} ({p.reviews})</p>
                <p className="text-xs text-slate-400 mb-3">{p.description}</p>
                <div className="flex items-center justify-between">
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