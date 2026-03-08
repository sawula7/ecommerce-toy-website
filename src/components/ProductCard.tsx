"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

const badgeStyles: Record<string, string> = {
  new:  "bg-green-500",
  hot:  "bg-primary",
  sale: "bg-secondary",
};

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block relative h-52 overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-400"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
          loading="lazy"
        />

        {product.badge && (
          <span
            className={`absolute top-3 left-3 ${badgeStyles[product.badge]} text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <div className="absolute top-3 right-3 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button
            onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
            className={`w-9 h-9 rounded-full bg-white border flex items-center justify-center shadow hover:bg-secondary hover:text-white hover:border-secondary transition-colors ${wishlisted ? "text-secondary" : "text-gray-400"}`}
            aria-label="Add to wishlist"
          >
            {wishlisted ? "♥" : "♡"}
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1">
          {product.category}
        </p>
        <Link href={`/product/${product.id}`}>
          <h4 className="font-bold text-sm text-gray-800 mb-1.5 leading-snug line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h4>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <span className="text-secondary text-sm">
            {"★".repeat(product.rating)}{"☆".repeat(5 - product.rating)}
          </span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        <p className="text-xs text-gray-400 mb-2">Age: {product.ageRange}</p>

        <div className="flex items-center gap-2 mb-3">
          {product.oldPrice && (
            <span className="text-sm text-gray-300 line-through">
              Rs.&nbsp;{product.oldPrice.toLocaleString()}
            </span>
          )}
          <span className="text-lg font-extrabold text-primary">
            Rs.&nbsp;{product.price.toLocaleString()}
          </span>
        </div>

        <button
          onClick={handleAdd}
          className={`w-full font-bold py-2.5 rounded-xl text-sm transition-all hover:-translate-y-0.5 active:scale-95 ${
            added
              ? "bg-green-500 text-white"
              : "bg-primary hover:bg-primary-dk text-white"
          }`}
        >
          {added ? "✓ Added to Cart!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
