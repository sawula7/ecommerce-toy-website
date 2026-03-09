"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useOrders } from "@/context/OrderContext";
import { useProducts } from "@/context/ProductContext";
import {
  OrderStatus,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
} from "@/context/OrderContext";
import { Product } from "@/data/products";

const ALL_STATUSES: OrderStatus[] = [
  "pending",
  "processing",
  "handed_to_courier",
  "delivered",
  "cancelled",
];

const CATEGORIES = ["STEM Toys", "DIY Puzzles", "Wooden Toys"];

const EMPTY_PRODUCT: Omit<Product, "id"> = {
  name: "",
  category: "STEM Toys",
  price: 0,
  rating: 5,
  reviews: 0,
  image: "",
  images: [],
  videoUrl: "",
  description: "",
  ageRange: "",
  material: "",
  includes: [],
  stock: 0,
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { orders, updateOrderStatus } = useOrders();
  const { products, addProduct, updateStock } = useProducts();

  const [tab, setTab] = useState<"orders" | "products">("orders");
  const [orderFilter, setOrderFilter] = useState<OrderStatus | "all">("all");
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>(EMPTY_PRODUCT);
  const [includesInput, setIncludesInput] = useState("");
  const [stockEdits, setStockEdits] = useState<Record<number, number>>({});
  const [addSuccess, setAddSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-400 animate-pulse text-sm">Loading…</div>
      </div>
    );
  }

  if (!session || !["admin", "manager"].includes(session.user?.role ?? "")) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <span className="text-6xl">🔒</span>
        <h1 className="text-2xl font-bold text-gray-800">Admin Access Only</h1>
        <p className="text-gray-400 text-sm">You do not have permission to view this page.</p>
        <Link href="/" className="bg-primary text-white font-bold px-6 py-3 rounded-full hover:bg-primary-dk transition-colors">
          Go Home
        </Link>
      </div>
    );
  }

  const filteredOrders =
    orderFilter === "all" ? orders : orders.filter((o) => o.status === orderFilter);

  async function uploadFile(file: File): Promise<string> {
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    });
    const { uploadUrl, publicUrl } = await res.json();
    await fetch(uploadUrl, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
    return publicUrl;
  }

  async function handleImageFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const urls = await Promise.all(Array.from(files).map(uploadFile));
      setNewProduct((p) => {
        const allImages = [...(p.images ?? []), ...urls];
        return { ...p, image: p.image || allImages[0], images: p.image ? allImages : allImages.slice(1) };
      });
    } finally {
      setUploading(false);
    }
  }

  function removeImage(url: string) {
    setNewProduct((p) => {
      if (p.image === url) {
        const rest = p.images ?? [];
        return { ...p, image: rest[0] ?? "", images: rest.slice(1) };
      }
      return { ...p, images: (p.images ?? []).filter((u) => u !== url) };
    });
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    await addProduct({
      ...newProduct,
      images: newProduct.images?.length ? newProduct.images : undefined,
      videoUrl: newProduct.videoUrl || undefined,
      includes: includesInput.split(",").map((s) => s.trim()).filter(Boolean),
    });
    setNewProduct(EMPTY_PRODUCT);
    setIncludesInput("");
    setAddSuccess(true);
    setTimeout(() => setAddSuccess(false), 3000);
  }

  function saveStock(id: number) {
    if (stockEdits[id] !== undefined) {
      updateStock(id, stockEdits[id]);
      setStockEdits((prev) => { const next = { ...prev }; delete next[id]; return next; });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🧸</span>
            <span className="text-xl font-bold text-primary" style={{ fontFamily: "var(--font-poppins)" }}>
              EduToys
            </span>
          </Link>
          <span className="text-gray-300">›</span>
          <span className="text-sm font-semibold text-gray-500">Admin Panel</span>
        </div>
        <span className="text-xs text-gray-400">{session.user?.email}</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-poppins)" }}>
          Admin Dashboard
        </h1>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Orders", value: orders.length, icon: "📦" },
            { label: "Pending", value: orders.filter((o) => o.status === "pending").length, icon: "⏳" },
            { label: "In Transit", value: orders.filter((o) => o.status === "handed_to_courier").length, icon: "🚚" },
            { label: "Products", value: products.length, icon: "🧸" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm text-center">
              <span className="text-3xl block mb-1">{s.icon}</span>
              <p className="text-2xl font-extrabold text-primary">{s.value}</p>
              <p className="text-xs text-gray-400 font-semibold mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["orders", "products"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                tab === t
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-400 border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {t === "orders" ? "Orders" : "Products"}
            </button>
          ))}
        </div>

        {/* ── ORDERS TAB ── */}
        {tab === "orders" && (
          <div>
            {/* Status filter */}
            <div className="flex flex-wrap gap-2 mb-5">
              {(["all", ...ALL_STATUSES] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setOrderFilter(s)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    orderFilter === s
                      ? "bg-gray-800 text-white border-gray-800"
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {s === "all" ? "All" : ORDER_STATUS_LABELS[s]}
                </button>
              ))}
            </div>

            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-gray-400 shadow-sm">
                No orders found.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      {/* Left: order info */}
                      <div>
                        <p className="font-bold text-gray-800">{order.id}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {order.userName} · {order.userEmail}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {/* Right: status + change */}
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${ORDER_STATUS_COLORS[order.status]}`}>
                          {ORDER_STATUS_LABELS[order.status]}
                        </span>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value as OrderStatus)
                          }
                          className="text-xs border-2 border-gray-200 focus:border-primary rounded-lg px-2 py-1.5 outline-none font-[inherit]"
                        >
                          {ALL_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {ORDER_STATUS_LABELS[s]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Items */}
                    <ul className="flex flex-col gap-2 mb-4 text-sm">
                      {order.items.map(({ product, quantity }) => (
                        <li key={product.id} className="flex justify-between text-gray-700">
                          <span>
                            {product.name}{" "}
                            <span className="text-gray-400">×{quantity}</span>
                          </span>
                          <span className="font-bold text-primary">
                            Rs.&nbsp;{(product.price * quantity).toLocaleString()}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Footer */}
                    <div className="border-t border-gray-100 pt-3 flex flex-wrap justify-between items-center gap-2 text-xs text-gray-400">
                      <span>
                        {order.address.address}, {order.address.city},{" "}
                        {order.address.district} · {order.userPhone}
                      </span>
                      <span className="font-extrabold text-primary text-sm">
                        Rs.&nbsp;{order.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── PRODUCTS TAB ── */}
        {tab === "products" && (
          <div className="flex flex-col gap-8">
            {/* Existing products — stock management */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-bold text-gray-800 mb-5" style={{ fontFamily: "var(--font-poppins)" }}>
                Manage Stock
              </h2>
              <div className="flex flex-col gap-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0"
                  >
                    <div
                      className="w-12 h-12 rounded-xl bg-gray-100 bg-cover bg-center shrink-0"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.category}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-gray-400 font-semibold">Stock:</span>
                      <input
                        type="number"
                        min={0}
                        value={stockEdits[product.id] ?? product.stock}
                        onChange={(e) =>
                          setStockEdits((prev) => ({
                            ...prev,
                            [product.id]: Number(e.target.value),
                          }))
                        }
                        className="w-20 border-2 border-gray-200 focus:border-primary rounded-lg px-2 py-1.5 text-sm outline-none text-center font-[inherit]"
                      />
                      {stockEdits[product.id] !== undefined && (
                        <button
                          onClick={() => saveStock(product.id)}
                          className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-primary-dk transition-colors"
                        >
                          Save
                        </button>
                      )}
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          product.stock === 0
                            ? "bg-red-100 text-red-600"
                            : product.stock <= 3
                            ? "bg-orange-100 text-orange-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {product.stock === 0 ? "Out of Stock" : product.stock <= 3 ? "Low" : "In Stock"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add new product */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-bold text-gray-800 mb-5" style={{ fontFamily: "var(--font-poppins)" }}>
                Add New Product
              </h2>
              {addSuccess && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold rounded-xl px-4 py-3">
                  ✓ Product added successfully!
                </div>
              )}
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AdminField
                  label="Product Name"
                  value={newProduct.name}
                  onChange={(v) => setNewProduct((p) => ({ ...p, name: v }))}
                  required
                />
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct((p) => ({ ...p, category: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:border-primary rounded-xl text-sm outline-none font-[inherit]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <AdminField
                  label="Price (Rs.)"
                  value={String(newProduct.price || "")}
                  onChange={(v) => setNewProduct((p) => ({ ...p, price: Number(v) }))}
                  type="number"
                  required
                />
                <AdminField
                  label="Old Price (Rs.) — optional"
                  value={String(newProduct.oldPrice ?? "")}
                  onChange={(v) => setNewProduct((p) => ({ ...p, oldPrice: v ? Number(v) : undefined }))}
                  type="number"
                />
                <AdminField
                  label="Stock"
                  value={String(newProduct.stock)}
                  onChange={(v) => setNewProduct((p) => ({ ...p, stock: Number(v) }))}
                  type="number"
                  required
                />
                <AdminField
                  label="Age Range (e.g. 6+ Years)"
                  value={newProduct.ageRange}
                  onChange={(v) => setNewProduct((p) => ({ ...p, ageRange: v }))}
                  required
                />
                {/* ── Images ── */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Images
                    <span className="text-gray-400 font-normal ml-1">(first image = main thumbnail)</span>
                  </label>

                  {/* Existing image thumbnails */}
                  {(newProduct.image || (newProduct.images ?? []).length > 0) && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {[newProduct.image, ...(newProduct.images ?? [])].filter(Boolean).map((url) => (
                        <div key={url} className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-200 group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={url} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(url!)}
                            className="absolute inset-0 bg-black/50 text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload button */}
                  <label className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-300 cursor-pointer text-sm font-semibold text-gray-500 hover:border-primary hover:text-primary transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                    {uploading ? "Uploading…" : "📎 Upload images"}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handleImageFiles(e.target.files)}
                    />
                  </label>
                  <span className="text-xs text-gray-400 ml-3">or paste a URL:</span>
                  <input
                    type="url"
                    placeholder="https://…"
                    className="mt-2 w-full px-4 py-2.5 border-2 border-gray-200 focus:border-primary rounded-xl text-sm outline-none font-[inherit]"
                    onBlur={(e) => {
                      const v = e.target.value.trim();
                      if (!v) return;
                      setNewProduct((p) => ({
                        ...p,
                        image: p.image || v,
                        images: p.image ? [...(p.images ?? []), v] : p.images,
                      }));
                      e.target.value = "";
                    }}
                  />
                </div>

                {/* ── Video URL ── */}
                <div className="sm:col-span-2">
                  <AdminField
                    label="Video URL (optional — YouTube embed or direct .mp4)"
                    value={newProduct.videoUrl ?? ""}
                    onChange={(v) => setNewProduct((p) => ({ ...p, videoUrl: v }))}
                    placeholder="https://www.youtube.com/embed/… or https://…/video.mp4"
                  />
                </div>
                <div className="sm:col-span-2">
                  <AdminField
                    label="Description"
                    value={newProduct.description}
                    onChange={(v) => setNewProduct((p) => ({ ...p, description: v }))}
                    required
                  />
                </div>
                <AdminField
                  label="Material"
                  value={newProduct.material}
                  onChange={(v) => setNewProduct((p) => ({ ...p, material: v }))}
                  required
                />
                <AdminField
                  label="Includes (comma-separated)"
                  value={includesInput}
                  onChange={setIncludesInput}
                  placeholder="e.g. Wooden pieces, Paint set, Manual"
                />
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Badge (optional)</label>
                  <select
                    value={newProduct.badge ?? ""}
                    onChange={(e) =>
                      setNewProduct((p) => ({
                        ...p,
                        badge: (e.target.value as Product["badge"]) || undefined,
                      }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:border-primary rounded-xl text-sm outline-none font-[inherit]"
                  >
                    <option value="">None</option>
                    <option value="new">New</option>
                    <option value="hot">Hot</option>
                    <option value="sale">Sale</option>
                  </select>
                </div>

                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={uploading || !newProduct.image}
                    className="bg-primary hover:bg-primary-dk disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-xl transition-all hover:-translate-y-0.5 shadow-md"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminField({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        min={type === "number" ? 0 : undefined}
        className="w-full px-4 py-3 border-2 border-gray-200 focus:border-primary rounded-xl text-sm outline-none transition-colors font-[inherit]"
      />
    </div>
  );
}
