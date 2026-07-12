export default function Hero() {
  return (
    <section className="px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <p className="text-orange-400 font-semibold mb-3 tracking-wide">TRENDING NOW</p>
        <h1 className="text-5xl font-bold leading-tight mb-4">
          Discover Products You&apos;ll Love
        </h1>
        <p className="text-slate-500 mb-8 max-w-md">
          Shop the latest trending products curated for modern lifestyles.
        </p>
        <div className="flex gap-4 mb-8">
          <button className="bg-orange-500 hover:bg-orange-600 transition-colors px-6 py-3 rounded-md font-medium">
            Shop Now
          </button>
          <button className="border border-slate-300 hover:border-slate-900 transition-colors px-6 py-3 rounded-md font-medium">
            Explore Collection
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"
              />
            ))}
          </div>
          <p className="text-sm text-slate-500">Loved by 50,000+ customers worldwide</p>
        </div>
      </div>

      <div className="relative bg-slate-100 rounded-xl h-96 flex items-center justify-center text-slate-400 overflow-hidden">
        hero image placeholder

        <div className="absolute top-6 left-6 bg-white text-slate-900 rounded-lg p-3 shadow-md border border-slate-200 w-28">
          <div className="h-12 bg-slate-200 rounded mb-2" />
          <p className="text-[11px] font-medium leading-tight">Air Max 270</p>
          <p className="text-[11px] text-orange-500 font-semibold">$129.99</p>
        </div>

        <div className="absolute top-6 right-6 bg-white text-slate-900 rounded-lg p-3 shadow-md border border-slate-200 w-28">
          <div className="h-12 bg-slate-200 rounded mb-2" />
          <p className="text-[11px] font-medium leading-tight">Smart Watch</p>
          <p className="text-[11px] text-orange-500 font-semibold">$199.99</p>
        </div>

        <div className="absolute bottom-24 left-6 bg-white text-slate-900 rounded-lg p-3 shadow-md border border-slate-200 w-32">
          <div className="h-12 bg-slate-200 rounded mb-2" />
          <p className="text-[11px] font-medium leading-tight">Wireless Headphones</p>
          <p className="text-[11px] text-orange-500 font-semibold">$99.99</p>
        </div>

        <div className="absolute bottom-6 right-6 bg-white text-slate-900 rounded-lg p-3 shadow-md border border-slate-200 w-28">
          <div className="h-12 bg-slate-200 rounded mb-2" />
          <p className="text-[11px] font-medium leading-tight">Water Bottle</p>
          <p className="text-[11px] text-orange-500 font-semibold">$24.99</p>
        </div>
      </div>
    </section>
  );
}