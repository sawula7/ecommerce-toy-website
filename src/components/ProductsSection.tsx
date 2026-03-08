"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { useProducts } from "@/context/ProductContext";

const tabs = ["All", "STEM Toys", "DIY Puzzles", "Wooden Toys"];

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState("All");
  const { products } = useProducts();

  const filtered =
    activeTab === "All"
      ? products
      : products.filter((p) => p.category === activeTab);

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
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
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-400 border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-10 py-3 rounded-full text-sm transition-all hover:-translate-y-0.5"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
}
