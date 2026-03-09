import Image from "next/image";

const reviews = [
  {
    text: "Absolutely love the DIY wooden robot kit! My son spent hours building it and learned so much about how things work. The quality is outstanding and the instructions were clear.",
    name: "Sarah M.",
    role: "Mother of 3",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&auto=format",
  },
  {
    text: "Great value for money, prompt delivery, and well-packaged items. The wooden toys are beautifully made and absolutely safe for my toddler. Will definitely order again!",
    name: "Rajeev P.",
    role: "Father of 2",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&auto=format",
  },
  {
    text: "I bought the STEM gears set for my classroom and the children love it! Toyhouse.lk service is great, products are affordable and the quality is very high. Highly recommended!",
    name: "Amara K.",
    role: "Preschool Teacher",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            What Parents Say
          </h2>
          <p className="text-gray-400">
            Thousands of happy families trust Toyhouse.lk for quality educational products
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-white rounded-2xl p-7 shadow-sm border-t-4 border-primary hover:shadow-md transition-shadow"
            >
              <div className="text-secondary text-xl mb-4">★★★★★</div>
              <p className="text-gray-500 text-sm leading-relaxed italic mb-6">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={r.img}
                    alt={r.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
