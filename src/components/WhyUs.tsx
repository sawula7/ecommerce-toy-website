import Image from "next/image";

const points = [
  "Expertly curated by child development specialists",
  "Safe, non-toxic materials meeting CE & international standards",
  "Authentic Montessori materials sourced from trusted suppliers",
  "Handmade wooden toys crafted by Sri Lankan artisans",
  "Delivery across Sri Lanka & worldwide shipping available",
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text */}
          <div className="flex-1">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-3">
              Why Toyhouse.lk?
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-5"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Your Trusted Source for<br />Educational Toys
            </h2>
            <p className="text-gray-400 mb-6 max-w-lg">
              We believe every child deserves toys that do more than entertain. Our collection is designed to nurture creativity, build cognitive skills, and inspire a lifelong love of learning.
            </p>
            <ul className="space-y-3 mb-8">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span className="text-green-500 mt-0.5 shrink-0">✅</span>
                  {p}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="inline-block bg-primary hover:bg-primary-dk text-white font-bold px-7 py-3 rounded-full transition-all hover:-translate-y-0.5"
            >
              About Us
            </a>
          </div>

          {/* Image */}
          <div className="flex-1 relative max-w-xl w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[6/5]">
              <Image
                src="https://images.unsplash.com/photo-1471286174890-9c112ac6f85a?w=600&h=500&fit=crop&auto=format"
                alt="Child learning with educational toys"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-5 -left-5 bg-primary text-white rounded-2xl p-4 shadow-xl text-center">
              <span
                className="block text-3xl font-bold leading-none"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                10+
              </span>
              <span className="text-xs font-semibold">Years of Trust</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
