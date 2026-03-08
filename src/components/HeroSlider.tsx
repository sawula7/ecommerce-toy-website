"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const slides = [
  {
    badge: "New Arrivals 2025",
    title: "Build. Create.",
    titleHighlight: "Explore.",
    desc: "Premium DIY wooden STEM toy kits that turn kids into little engineers and artists. Eco-friendly, safe, and endlessly fun.",
    bg: "from-[#e4f9fa] to-[#c5f1f4]",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=620&h=500&fit=crop&auto=format",
    imgAlt: "DIY wooden toy assembly kit",
    cta: "Shop STEM Kits",
    ctaSecondary: "See Categories",
  },
  {
    badge: "Handmade in Sri Lanka",
    title: "Artisan",
    titleHighlight: "Wooden Toys",
    desc: "Exquisite handcrafted wooden toys by local Sri Lankan artisans. Each piece uses child-safe wood and non-toxic paints.",
    bg: "from-[#f0eeff] to-[#ddd6fe]",
    img: "https://images.unsplash.com/photo-1561553873-e8491a564fd0?w=620&h=500&fit=crop&auto=format",
    imgAlt: "Handmade wooden educational toys",
    cta: "Shop Wooden Toys",
    ctaSecondary: "Our Story",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    []
  );
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden">
      <div
        className={`bg-gradient-to-br ${slide.bg} transition-all duration-700`}
      >
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-20 flex flex-col md:flex-row items-center gap-10">
          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-wide">
              {slide.badge}
            </span>
            <h1
              className="text-4xl md:text-6xl font-bold leading-tight mb-4 text-gray-900"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {slide.title}
              <br />
              <span className="text-primary">{slide.titleHighlight}</span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-md mx-auto md:mx-0 mb-8">
              {slide.desc}
            </p>
            <div className="flex gap-4 justify-center md:justify-start flex-wrap">
              <a
                href="#products"
                className="bg-primary hover:bg-primary-dk text-white font-bold px-7 py-3 rounded-full transition-all hover:-translate-y-0.5 shadow-md"
              >
                {slide.cta}
              </a>
              <a
                href="#categories"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-7 py-3 rounded-full transition-all hover:-translate-y-0.5"
              >
                {slide.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-lg aspect-[4/3]">
              <Image
                src={slide.img}
                alt={slide.imgAlt}
                fill
                className="object-contain drop-shadow-2xl rounded-2xl"
                priority
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 shadow flex items-center justify-center text-primary text-2xl hover:bg-primary hover:text-white transition-colors"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 shadow flex items-center justify-center text-primary text-2xl hover:bg-primary hover:text-white transition-colors"
        aria-label="Next"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current
                ? "bg-primary scale-125"
                : "bg-gray-400/60 hover:bg-gray-500"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
