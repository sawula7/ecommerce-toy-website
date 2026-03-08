"use client";

import { useState, useCallback } from "react";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import type { Product } from "@/data/products";

const tabs = ["All", "STEM Toys", "DIY Puzzles", "Montessori", "Wooden Toys", "Arts & Crafts"];

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);

  const filtered =
    activeTab === "All"
      ? products
      : products.filter((p) => p.category === activeTab);

  const handleAddToCart = useCallback((product: Product) => {
    setCartCount((c) => c + 1);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
    // Update cart badge in DOM (simple approach)
    const badge = document.querySelector(".cart-count-badge");
    if (badge) badge.textContent = String(cartCount + 1);
    console.log("Added to cart:", product.name);
  }, [cartCount]);

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Most Popular Toy Sets
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Designed to inspire learning, creativity, and fun for kids of all ages
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 justify-center flex-wrap mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                activeTab === tab
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-400 border-gray-200 hover:border-orange-400 hover:text-orange-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold px-10 py-3 rounded-full text-sm transition-all hover:-translate-y-0.5"
          >
            View All Products
          </a>
        </div>
      </div>

      {/* Toast */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-600 text-white font-bold px-7 py-3.5 rounded-full shadow-xl text-sm transition-all duration-400 z-50 whitespace-nowrap ${
          toastVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        ✅ Item added to cart!
      </div>
    </section>
  );
}
