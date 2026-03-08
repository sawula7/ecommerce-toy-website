import Image from "next/image";

export default function PromoBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Large promo */}
          <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden flex items-center justify-between p-8 gap-6 hover:shadow-lg transition-shadow">
            <div className="flex-1">
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block mb-2">
                Special Offer
              </span>
              <h3
                className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Up to 30% Off<br />DIY Toy Sets
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Limited time deal on bestselling wooden STEM kits and puzzle bundles
              </p>
              <a
                href="#products"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-full transition-colors"
              >
                Shop Offer
              </a>
            </div>
            <div className="hidden sm:block relative w-56 h-48 shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=350&fit=crop&auto=format"
                alt="DIY toy sale"
                fill
                className="object-cover rounded-xl"
                sizes="224px"
              />
            </div>
          </div>

          {/* Small promos */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden flex items-center justify-between p-6 gap-4 hover:shadow-lg transition-shadow flex-1">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                  New In
                </span>
                <h3
                  className="text-xl font-bold text-gray-900 leading-snug mb-3"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  STEM Explorer Kits
                </h3>
                <a href="#" className="inline-block bg-white text-orange-500 hover:bg-orange-500 hover:text-white border border-orange-300 font-bold px-4 py-1.5 rounded-full text-sm transition-colors">
                  Explore
                </a>
              </div>
              <div className="relative w-24 h-20 shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&h=180&fit=crop&auto=format"
                  alt="STEM kits"
                  fill
                  className="object-cover rounded-xl"
                  sizes="96px"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-sky-100 overflow-hidden flex items-center justify-between p-6 gap-4 hover:shadow-lg transition-shadow flex-1">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
                  Bestseller
                </span>
                <h3
                  className="text-xl font-bold text-gray-900 leading-snug mb-3"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Wooden Puzzles
                </h3>
                <a href="#" className="inline-block bg-white text-orange-500 hover:bg-orange-500 hover:text-white border border-orange-300 font-bold px-4 py-1.5 rounded-full text-sm transition-colors">
                  Shop Now
                </a>
              </div>
              <div className="relative w-24 h-20 shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=200&h=180&fit=crop&auto=format"
                  alt="Wooden puzzles"
                  fill
                  className="object-cover rounded-xl"
                  sizes="96px"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
