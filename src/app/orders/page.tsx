"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useOrders } from "@/context/OrderContext";
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/context/OrderContext";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { getUserOrders } = useOrders();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/orders");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-400 text-sm animate-pulse">Loading…</div>
      </div>
    );
  }

  if (!session) return null;

  const orders = getUserOrders(session.user?.email ?? null, session.user?.email ?? "");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🧸</span>
            <span className="text-xl font-bold text-primary" style={{ fontFamily: "var(--font-poppins)" }}>
              EduToys
            </span>
          </Link>
          <span className="text-gray-300">›</span>
          <span className="text-sm text-gray-400 font-semibold">My Orders</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
          My Orders
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Logged in as <span className="font-semibold text-gray-600">{session.user?.email}</span>
        </p>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <span className="text-6xl">📦</span>
            <h2 className="text-xl font-bold text-gray-700">No orders yet</h2>
            <p className="text-gray-400 text-sm">Start shopping and your orders will appear here.</p>
            <Link
              href="/"
              className="bg-primary hover:bg-primary-dk text-white font-bold px-8 py-3 rounded-full transition-colors"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm p-6">
                {/* Order header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                  <div>
                    <p className="font-bold text-gray-800" style={{ fontFamily: "var(--font-poppins)" }}>
                      {order.id}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Placed on{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${ORDER_STATUS_COLORS[order.status]}`}
                  >
                    {ORDER_STATUS_LABELS[order.status]}
                  </span>
                </div>

                {/* Items */}
                <ul className="flex flex-col gap-3 mb-4">
                  {order.items.map(({ product, quantity }) => (
                    <li key={product.id} className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl bg-gray-100 bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url(${product.image})` }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.category} · Qty {quantity}</p>
                      </div>
                      <p className="font-bold text-primary text-sm shrink-0">
                        Rs.&nbsp;{(product.price * quantity).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* Totals + address */}
                <div className="border-t border-gray-100 pt-4 flex flex-wrap justify-between items-end gap-3 text-sm">
                  <div className="text-xs text-gray-400 space-y-1">
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
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Order Total</p>
                    <p className="font-extrabold text-primary text-lg">
                      Rs.&nbsp;{order.total.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
