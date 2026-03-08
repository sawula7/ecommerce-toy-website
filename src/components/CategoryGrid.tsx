import Image from "next/image";
import { categories } from "@/data/products";

export default function CategoryGrid() {
  return (
    <section id="categories" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Shop by Category
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Find the perfect educational toy for every stage of your child&apos;s development
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#"
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-400"
                  sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-gray-800 mb-1">{cat.name}</h3>
                <span className="text-xs text-gray-400">{cat.count}+ Items</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
