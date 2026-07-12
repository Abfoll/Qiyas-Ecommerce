export default function PromoBanners() {
  return (
    <section className="px-8 py-8 grid md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-8">
        <p className="text-sm font-semibold mb-2 text-white">Flash Sale</p>
        <h3 className="text-3xl font-bold mb-4 text-white">Up To 70% Off</h3>
        <div className="flex gap-3 mb-6 text-sm text-white">
          <span className="bg-black/20 px-3 py-1 rounded">02 : Days</span>
          <span className="bg-black/20 px-3 py-1 rounded">15 : Hours</span>
          <span className="bg-black/20 px-3 py-1 rounded">45 : Mins</span>
          <span className="bg-black/20 px-3 py-1 rounded">30 : Secs</span>
        </div>
        <button className="bg-white text-slate-900 font-medium px-5 py-2.5 rounded-md">
          Shop Sale Now
        </button>
      </div>

      <div className="bg-slate-100 rounded-xl p-8 border border-slate-200">
        <p className="text-sm text-slate-500 mb-2">New Collection</p>
        <h3 className="text-3xl font-bold mb-4">Summer 2025</h3>
        <p className="text-slate-500 mb-6 text-sm">
          Discover the latest trends and fresh styles.
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-medium px-5 py-2.5 rounded-md">
          Shop Collection
        </button>
      </div>
    </section>
  );
}