import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { label: "Happy customers", value: "50,000+" },
  { label: "Products", value: "1,200+" },
  { label: "Countries shipped to", value: "35" },
  { label: "Years in business", value: "8" },
];

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      <div className="px-8 py-16 max-w-3xl">
        <p className="text-orange-500 text-sm font-semibold mb-3">ABOUT US</p>
        <h1 className="text-4xl font-bold mb-6">Built for people who love good design</h1>
        <p className="text-slate-500 mb-4">
          NovaTrend started as a small idea: shopping online shouldn&apos;t feel
          transactional. We curate products from brands that care about
          quality and craftsmanship, then bring them to you with the kind of
          service you&apos;d expect from a boutique — at scale.
        </p>
        <p className="text-slate-500">
          Today we work with makers across fashion, electronics, beauty,
          fitness, and home goods, all held to the same bar: things worth
          keeping, not just buying.
        </p>
      </div>

      <div className="px-8 pb-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
        {stats.map((s) => (
          <div key={s.label} className="bg-slate-50 border border-slate-200 rounded-lg p-5">
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <Footer />
    </main>
  );
}