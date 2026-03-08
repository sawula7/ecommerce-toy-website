"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/data/products";

const badgeStyles: Record<string, string> = {
  new: "bg-green-500",
  hot: "bg-primary",
  sale: "bg-secondary",
};

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: Props) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-400"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 ${badgeStyles[product.badge]} text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full`}
          >
            {product.badge}
          </span>
        )}

        {/* Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button
            onClick={() => setWishlisted(!wishlisted)}
            className={`w-9 h-9 rounded-full bg-white border flex items-center justify-center shadow hover:bg-primary hover:text-white hover:border-primary transition-colors ${wishlisted ? "text-red-500" : "text-gray-400"}`}
            aria-label="Wishlist"
          >
            {wishlisted ? "♥" : "♡"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1">
          {product.category}
        </p>
        <h4 className="font-bold text-sm text-gray-800 mb-1.5 leading-snug line-clamp-2">
          {product.name}
        </h4>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-2">
          <span className="text-secondary text-sm">
            {"★".repeat(product.rating)}
            {"☆".repeat(5 - product.rating)}
          </span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Age */}
        <p className="text-xs text-gray-400 mb-2">Age: {product.ageRange}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          {product.oldPrice && (
            <span className="text-sm text-gray-300 line-through">
              Rs. {product.oldPrice.toLocaleString()}
            </span>
          )}
          <span className="text-lg font-extrabold text-primary">
            Rs. {product.price.toLocaleString()}
          </span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-primary hover:bg-primary-dk text-white font-bold py-2.5 rounded-xl text-sm transition-all hover:-translate-y-0.5 active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
