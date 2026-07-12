const badges = [
  { icon: "✓", title: "Premium Quality", subtitle: "Made with the finest materials" },
  { icon: "🚚", title: "Fast Delivery", subtitle: "Quick and reliable shipping" },
  { icon: "🔒", title: "Secure Checkout", subtitle: "Your data is protected" },
  { icon: "★", title: "Customer Satisfaction", subtitle: "100% satisfaction guarantee" },
];

export default function Footer() {
  return (
    <footer className="px-8 py-10 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6">
      {badges.map((b) => (
        <div key={b.title} className="flex items-center gap-3">
          <span className="text-xl">{b.icon}</span>
          <div>
            <p className="font-medium text-sm">{b.title}</p>
            <p className="text-xs text-slate-500">{b.subtitle}</p>
          </div>
        </div>
      ))}
    </footer>
  );
}