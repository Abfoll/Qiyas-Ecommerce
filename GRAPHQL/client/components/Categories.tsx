import SlideIn from "./SlideIn";

const categories = [
  "Fashion",
  "Electronics",
  "Beauty",
  "Fitness",
  "Home Decor",
  "Accessories",
];

export default function Categories() {
  return (
    <section className="px-8 py-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Shop by Categories</h2>
        <a href="#" className="text-sm text-orange-500 hover:underline">
          View All Categories →
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {categories.map((cat, i) => (
          <SlideIn key={cat} delay={i * 80}>
            <div className="bg-white rounded-lg overflow-hidden border border-slate-200 hover:border-orange-400 transition-colors cursor-pointer shadow-sm">
              <div className="h-28 bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                image
              </div>
              <div className="p-3">
                <p className="font-medium text-sm">{cat}</p>
                <p className="text-xs text-slate-500">Shop Now</p>
              </div>
            </div>
          </SlideIn>
        ))}
      </div>
    </section>
  );
}