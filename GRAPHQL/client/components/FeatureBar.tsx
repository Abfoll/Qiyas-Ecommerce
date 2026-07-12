const features = [
  { icon: "🚚", title: "Free Shipping", subtitle: "On orders over $50" },
  { icon: "🔒", title: "Secure Payments", subtitle: "100% secure checkout" },
  { icon: "↺", title: "Easy Returns", subtitle: "30-day return policy" },
  { icon: "🎧", title: "24/7 Support", subtitle: "Always here to help" },
];

export default function FeatureBar() {
  return (
    <section className="px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-slate-200">
      {features.map((f) => (
        <div key={f.title} className="flex items-center gap-3">
          <span className="text-2xl">{f.icon}</span>
          <div>
            <p className="font-medium">{f.title}</p>
            <p className="text-sm text-slate-500">{f.subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
}