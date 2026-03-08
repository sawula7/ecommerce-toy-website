import Image from "next/image";

const ageGroups = [
  {
    range: "0 – 1",
    label: "Sensory & Newborn",
    img: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=280&h=280&fit=crop&auto=format",
    alt: "Baby sensory toys",
  },
  {
    range: "1 – 3",
    label: "Toddler Exploration",
    img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=280&h=280&fit=crop&auto=format",
    alt: "Toddler learning toys",
  },
  {
    range: "3 – 5",
    label: "Preschool Learning",
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=280&h=280&fit=crop&auto=format",
    alt: "Preschool educational toys",
  },
  {
    range: "5+",
    label: "Creative & STEAM",
    img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=280&h=280&fit=crop&auto=format",
    alt: "STEAM and creative toys",
  },
];

export default function ShopByAge() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Shop by Age
          </h2>
          <p className="text-gray-400 max-w-sm mx-auto">
            Age-appropriate toys to support your child&apos;s development at every stage
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {ageGroups.map((g) => (
            <a
              key={g.range}
              href="#"
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 text-center pb-5"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={g.img}
                  alt={g.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-400"
                  sizes="(max-width:768px) 50vw, 25vw"
                />
              </div>
              <div className="mt-4 mb-1">
                <span
                  className="block text-3xl font-bold text-orange-500 leading-none"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {g.range}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold">
                  Years
                </span>
              </div>
              <p className="text-sm text-gray-500 font-semibold">{g.label}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
