"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const DELIVERY_FEE = 350;

export default function CartDrawer() {
  const { items, isOpen, subtotal, totalItems, removeFromCart, setQuantity, closeCart } = useCart();

  const deliveryFee = DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>
            <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: "var(--font-poppins)" }}>
              My Cart
            </h2>
            {totalItems > 0 && (
              <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>


        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 pb-20">
              <span className="text-7xl">🧸</span>
              <p className="font-bold text-gray-700 text-lg">Your cart is empty</p>
              <p className="text-gray-400 text-sm">Add some fun educational toys to get started!</p>
              <button
                onClick={closeCart}
                className="bg-primary hover:bg-primary-dk text-white font-bold px-7 py-3 rounded-full transition-colors"
              >
                Shop Now
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4 bg-gray-50 rounded-2xl p-3">
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-0.5">
                      {product.category}
                    </p>
                    <p className="font-bold text-sm text-gray-800 leading-snug line-clamp-2 mb-1">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-400 mb-2">Age: {product.ageRange}</p>

                    <div className="flex items-center justify-between">
                      {/* Qty controls */}
                      <div className="flex items-center gap-2 bg-white rounded-full border border-gray-200 px-1 py-0.5">
                        <button
                          onClick={() => setQuantity(product.id, quantity - 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-colors text-sm font-bold"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-sm font-bold text-gray-800">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(product.id, quantity + 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-colors text-sm font-bold"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <p className="font-extrabold text-primary text-base">
                        Rs.&nbsp;{(product.price * quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="self-start text-gray-300 hover:text-red-400 transition-colors text-lg leading-none mt-0.5"
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer / totals */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 pt-4 pb-6 flex flex-col gap-3">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
              <span>Rs.&nbsp;{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Delivery</span>
              <span>Rs.&nbsp;{deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-extrabold text-gray-900 text-base border-t border-gray-100 pt-3">
              <span>Total</span>
              <span className="text-primary">Rs.&nbsp;{total.toLocaleString()}</span>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full bg-primary hover:bg-primary-dk text-white font-bold py-4 rounded-2xl text-center transition-all hover:-translate-y-0.5 shadow-md"
            >
              Proceed to Checkout →
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-gray-400 hover:text-gray-600 text-sm font-semibold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
