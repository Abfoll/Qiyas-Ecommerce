import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-[#F9F9FB] px-6 py-12 md:px-16 md:py-20 lg:py-2 grid md:grid-cols-2 gap-12 items-center overflow-hidden">
      
      {/* LEFT CONTENT CONTAINER */}
      <div className="z-10 max-w-xl">
        <p className="text-orange-500 font-bold text-xs tracking-[0.15em] mb-4 uppercase">
          Trending Now
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] mb-6 tracking-tight">
          Discover Products <br className="hidden sm:inline" />
          You&apos;ll Love
        </h1>
        <p className="text-slate-500 text-base sm:text-lg mb-8 max-w-md leading-relaxed">
          Shop the latest trending products curated for modern lifestyles.
        </p>
        
        {/* Call to Actions */}
        <div className="flex flex-wrap gap-4 mb-10">
          <button className="bg-[#FF5A36] hover:bg-[#e04827] text-white transition-all duration-300 px-7 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 shadow-md shadow-orange-500/10">
            Shop Now <span>&rarr;</span>
          </button>
          <button className="border border-slate-200 hover:border-slate-800 bg-white hover:bg-slate-50 text-slate-800 transition-all duration-300 px-7 py-3.5 rounded-full font-semibold text-sm">
            Explore Collection
          </button>
        </div>

        {/* Customer Proof */}
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full bg-slate-200 border-2 border-white overflow-hidden relative shadow-sm"
              >
                <span className="text-[10px] flex items-center justify-center h-full w-full bg-slate-300 text-slate-600 font-bold">
                  U{i}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Loved by <span className="text-slate-950 font-bold">50,000+</span> customers worldwide
          </p>
        </div>
      </div>

      {/* RIGHT HERO IMAGE CONTAINER */}
      <div className="relative w-full h-[450px] sm:h-[500px] lg:h-[550px] overflow-hidden rounded-3xl">
        
        {/* Orange/Red Fluid Background Circle behind the model
            Sized and centered to fully wrap the photo so no gray backdrop
            or mismatched edges show through around it */}
        <div className="absolute inset-0 m-auto w-[92%] h-[88%] rounded-[60px] bg-gradient-to-tr from-[#FF5A36] to-[#FF3F3A] opacity-90 rotate-[6deg] z-0" />

        {/* Main hero image wrapper - centered over the blob so the photo's
            edges land inside the orange shape instead of spilling past it */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[92%] z-10 transition-transform duration-500 hover:scale-[1.01]">
          <Image
            src="/images/girl-photo.png"
            alt="Hero shopping model"
            fill
            priority
            className="object-contain object-bottom"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* FLOATING CARD 1: Air Max 270 (Top Left) */}
        <div className="absolute top-[8%] left-[5%] z-20 flex items-center gap-3 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 w-44 hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-slate-50 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
            <img
              src="/images/air-max-270.jpg"
              alt="Air Max 270"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 leading-tight">Air Max 270</p>
            <p className="text-[11px] text-orange-500 font-extrabold mt-0.5">$129.99</p>
          </div>
        </div>

        {/* FLOATING CARD 2: Wireless Headphones (Middle Left) */}
        <div className="absolute top-[48%] -left-[2%] z-20 flex items-center gap-3 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 w-44 hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-slate-50 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
            <img
              src="/images/Wirless-Headphone.jpg"
              alt="Wireless Headphones"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-900 leading-tight">Wireless Headph...</p>
            <p className="text-[11px] text-orange-500 font-extrabold mt-0.5">$99.99</p>
          </div>
        </div>

        {/* FLOATING CARD 3: Smart Watch (Top Right) */}
        <div className="absolute top-[10%] right-[5%] z-20 flex items-center gap-3 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 w-44 hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-slate-50 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
            <img
              src="/images/smart-watch.jpg"
              alt="Smart Watch"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 leading-tight">Smart Watch</p>
            <p className="text-[11px] text-orange-500 font-extrabold mt-0.5">$199.99</p>
          </div>
        </div>

        {/* FLOATING CARD 4: Water Bottle (Middle Right) */}
        <div className="absolute bottom-[22%] right-[2%] z-20 flex items-center gap-3 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 w-44 hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-slate-50 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
            <img
              src="/images/water-bottle.jpg"
              alt="Water Bottle"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 leading-tight">Water Bottle</p>
            <p className="text-[11px] text-orange-500 font-extrabold mt-0.5">$24.99</p>
          </div>
        </div>

      </div>
    </section>
  );
}