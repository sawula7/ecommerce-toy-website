import Image from "next/image";
import type { CategoryItem } from "@/app/api/categories/route";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format";

async function fetchCategories(): Promise<CategoryItem[]> {
  try {
    const baseUrl =
      process.env.NEXTAUTH_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
    const res = await fetch(`${baseUrl}/api/categories`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("fetch failed");
    return res.json();
  } catch {
    return [];
  }
}

export default async function CategoryGrid() {
  const categories = await fetchCategories();

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
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <Image
                  src={cat.image ?? FALLBACK_IMAGE}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-400"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 33vw, 25vw"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-gray-800 mb-1">{cat.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
