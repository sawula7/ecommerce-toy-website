"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useOrders } from "@/context/OrderContext";
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/context/OrderContext";

function OrderConfirmedContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") ?? "";
  const { orders } = useOrders();
  const order = orders.find((o) => o.id === orderId);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-5xl mb-6 shadow-lg">
        ✅
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Order Placed!
      </h1>
      <p className="text-gray-500 text-base max-w-md mb-2">
        Thank you for shopping with EduToys. Your order has been received and is being processed.
      </p>
      <p className="text-sm text-gray-400 mb-2">
        Order number:{" "}
        <span className="font-bold text-primary">{orderId || "—"}</span>
      </p>

      {order && (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-6 ${ORDER_STATUS_COLORS[order.status]}`}
        >
          {ORDER_STATUS_LABELS[order.status]}
        </span>
      )}

      {order && (
        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-md w-full text-left mb-8">
          <h2 className="font-bold text-gray-800 mb-4" style={{ fontFamily: "var(--font-poppins)" }}>
            Order Summary
          </h2>
          <ul className="flex flex-col gap-3 mb-4">
            {order.items.map(({ product, quantity }) => (
              <li key={product.id} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {product.name}{" "}
                  <span className="text-gray-400">×{quantity}</span>
                </span>
                <span className="font-bold text-primary">
                  Rs.&nbsp;{(product.price * quantity).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-100 pt-3 flex flex-col gap-1 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>Rs.&nbsp;{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Delivery</span>
              <span>Rs.&nbsp;{order.deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-extrabold text-gray-900 text-base mt-2 pt-2 border-t border-gray-100">
              <span>Total</span>
              <span className="text-primary">Rs.&nbsp;{order.total.toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-400 space-y-1">
            <p>
              <span className="font-semibold text-gray-600">Deliver to:</span>{" "}
              {order.address.address}, {order.address.city}, {order.address.district}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Payment:</span>{" "}
              {order.paymentMethod === "cod"
                ? "Cash on Delivery"
                : order.paymentMethod === "card"
                ? "Card"
                : "Bank Transfer"}
            </p>
          </div>
        </div>
      )}

      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full mb-10">
        {[
          { icon: "📧", title: "Confirmation Email", desc: "A confirmation has been sent to your email address." },
          { icon: "🚚", title: "Delivery", desc: "Your order will be delivered within 3–5 business days." },
          { icon: "📞", title: "Need Help?", desc: "Call us on 0777489034 Mon–Sat 9am–6pm." },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <span className="text-3xl block mb-2">{card.icon}</span>
            <p className="font-bold text-sm text-gray-800 mb-1">{card.title}</p>
            <p className="text-xs text-gray-400 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          href="/"
          className="bg-primary hover:bg-primary-dk text-white font-bold px-8 py-3.5 rounded-full transition-all hover:-translate-y-0.5 shadow-md"
        >
          Continue Shopping
        </Link>
        <Link
          href="/orders"
          className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-3.5 rounded-full transition-all hover:-translate-y-0.5"
        >
          My Orders
        </Link>
      </div>

      <Link href="/" className="flex items-center gap-2 mt-12 opacity-40 hover:opacity-70 transition-opacity">
        <span className="text-2xl">🧸</span>
        <span className="font-bold text-gray-600" style={{ fontFamily: "var(--font-poppins)" }}>EduToys</span>
      </Link>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense>
      <OrderConfirmedContent />
    </Suspense>
  );
}
