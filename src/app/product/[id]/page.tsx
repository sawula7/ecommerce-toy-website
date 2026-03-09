"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DELIVERY_FEE = 350;

const badgeStyles: Record<string, string> = {
  new:  "bg-green-500",
  hot:  "bg-primary",
  sale: "bg-secondary",
};

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { products } = useProducts();
  const product = products.find((p) => p.id === Number(id));

  const { addToCart } = useCart();

  if (!product) notFound();
  // product is defined from here — notFound() throws but TS doesn't infer it
  // notFound() throws, asserting so TS sees a defined Product below
  const p = product as NonNullable<typeof product>;

  const allImages = [p.image, ...(p.images ?? [])].filter(Boolean);
  const hasVideo = Boolean(p.videoUrl);
  type MediaItem = string | "video";
  const mediaItems: MediaItem[] = [...allImages, ...(hasVideo ? (["video"] as MediaItem[]) : [])];

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "includes" | "specs">("description");
  const [activeMedia, setActiveMedia] = useState<MediaItem>(allImages[0] ?? "video");

  const related = products.filter((r) => r.category === p.category && r.id !== p.id).slice(0, 4);
  const total = p.price * qty;

  function handleAdd() {
    for (let i = 0; i < qty; i++) addToCart(p);
    setAdded(true);
  }

  return (
    <>
    <TopBar />
    <Header />
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-primary transition-colors font-semibold">Home</Link>
          <span>›</span>
          <Link href="/#products" className="hover:text-primary transition-colors font-semibold">{p.category}</Link>
          <span>›</span>
          <span className="text-gray-600 line-clamp-1">{p.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* ── Main product section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

          {/* Left — media gallery */}
          <div className="flex flex-col gap-3">
            {/* Main media viewer */}
            <div className="relative rounded-3xl overflow-hidden bg-white shadow-md aspect-square">
              {activeMedia === "video" && p.videoUrl ? (
                p.videoUrl.includes("youtube") || p.videoUrl.includes("youtu.be") || p.videoUrl.includes("vimeo") ? (
                  <iframe
                    src={p.videoUrl}
                    title={`${p.name} video`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={p.videoUrl}
                    controls
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )
              ) : (
                <Image
                  src={activeMedia as string}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                  priority
                />
              )}
              {p.badge && activeMedia !== "video" && (
                <span className={`absolute top-4 left-4 ${badgeStyles[p.badge]} text-white text-xs font-extrabold uppercase px-3 py-1.5 rounded-full`}>
                  {p.badge}
                </span>
              )}
            </div>

            {/* Thumbnail strip — only shown when there are multiple media items */}
            {mediaItems.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {mediaItems.map((item, i) => (
                  <button
                    key={item === "video" ? "video" : i}
                    onClick={() => setActiveMedia(item)}
                    className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeMedia === item ? "border-primary shadow-md" : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {item === "video" ? (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <span className="text-white text-xl">▶</span>
                      </div>
                    ) : (
                      <Image
                        src={item}
                        alt={`${p.name} ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — details */}
          <div className="flex flex-col">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
              {p.category}
            </p>
            <h1
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-snug"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {p.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-secondary text-lg">
                {"★".repeat(p.rating)}{"☆".repeat(5 - p.rating)}
              </span>
              <span className="text-sm text-gray-400">({p.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              {p.oldPrice && (
                <span className="text-gray-300 line-through text-lg">
                  Rs.&nbsp;{p.oldPrice.toLocaleString()}
                </span>
              )}
              <span className="text-3xl font-extrabold text-primary">
                Rs.&nbsp;{p.price.toLocaleString()}
              </span>
              {p.oldPrice && (
                <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  {Math.round((1 - p.price / p.oldPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Quick info pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { icon: "🎂", label: `Age ${p.ageRange}` },
                { icon: "🪵", label: p.material.split(",")[0] },
                { icon: "📦", label: `${p.includes.length} items included` },
              ].map((pill) => (
                <span key={pill.label} className="flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                  <span>{pill.icon}</span>
                  {pill.label}
                </span>
              ))}
            </div>

            {/* Short description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6 bg-white rounded-2xl p-4 border border-gray-100">
              {p.description}
            </p>

            {/* Qty selector */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-bold text-gray-700">Quantity</span>
              <div className="flex items-center gap-3 bg-white border-2 border-gray-200 rounded-full px-2 py-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-colors font-bold text-lg"
                >
                  −
                </button>
                <span className="w-8 text-center font-bold text-gray-900">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-colors font-bold text-lg"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-400">
                Total: <strong className="text-primary">Rs.&nbsp;{total.toLocaleString()}</strong>
              </span>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 mb-6">
              {p.stock === 0 ? (
                <button
                  disabled
                  className="flex-1 font-bold py-4 rounded-2xl text-base bg-gray-200 text-gray-400 cursor-not-allowed"
                >
                  Out of Stock
                </button>
              ) : (
                <>
                  <button
                    onClick={handleAdd}
                    disabled={added}
                    className={`flex-1 font-bold py-4 rounded-2xl text-base transition-all hover:-translate-y-0.5 active:scale-95 shadow-md ${
                      added ? "bg-green-500 text-white cursor-default" : "bg-primary hover:bg-primary-dk text-white"
                    }`}
                  >
                    {added ? "✓ Added to Cart!" : "Add to Cart"}
                  </button>
                  <Link
                    href="/checkout"
                    onClick={() => { for (let i = 0; i < qty; i++) addToCart(p); }}
                    className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-4 rounded-2xl text-base text-center transition-all hover:-translate-y-0.5"
                  >
                    Buy Now
                  </Link>
                </>
              )}
            </div>

            {/* Delivery & safety */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "🚚", title: "Island-wide Delivery", sub: `Rs. ${DELIVERY_FEE} flat fee` },
                { icon: "🛡️", title: "Safe & Non-toxic",     sub: "CE certified materials" },
                { icon: "↩️", title: "Easy Returns",          sub: "7-day return policy" },
                { icon: "📞", title: "Support",               sub: "0777489034 Mon–Sat" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-2.5 bg-white rounded-xl p-3 border border-gray-100">
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-gray-700">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs: Description / What's Included / Specs ── */}
        <div className="bg-white rounded-3xl shadow-sm p-6 mb-16">
          <div className="flex gap-1 border-b border-gray-100 mb-6">
            {(["description", "includes", "specs"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-bold capitalize rounded-t-xl transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "text-gray-400 hover:text-primary"
                }`}
              >
                {tab === "includes" ? "What's Included" : tab}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div className="max-w-2xl">
              <p className="text-gray-700 leading-relaxed text-base">{p.description}</p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: "🌿", label: "Eco-friendly", desc: "Made from sustainably sourced wood" },
                  { icon: "🎨", label: "Creative Play", desc: "Encourages imagination and expression" },
                  { icon: "🧠", label: "Educational",   desc: "Develops key skills through play" },
                ].map((f) => (
                  <div key={f.label} className="bg-gray-50 rounded-2xl p-4 text-center">
                    <span className="text-3xl block mb-2">{f.icon}</span>
                    <p className="font-bold text-sm text-gray-800 mb-1">{f.label}</p>
                    <p className="text-xs text-gray-400">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "includes" && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
              {p.includes.map((item) => (
                <li key={item} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">✓</span>
                  <span className="text-sm font-semibold text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === "specs" && (
            <div className="max-w-md">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Age Range",  p.ageRange],
                    ["Material",   p.material],
                    ["Category",   p.category],
                    ["Items in Box", `${p.includes.length} pieces`],
                    ["Safety",     "CE certified, non-toxic"],
                    ["Origin",     "Sri Lanka"],
                  ].map(([key, val]) => (
                    <tr key={key} className="border-b border-gray-100 last:border-0">
                      <td className="py-3 pr-6 font-bold text-gray-500 w-36">{key}</td>
                      <td className="py-3 text-gray-800 font-semibold">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Related products ── */}
        {related.length > 0 && (
          <div>
            <h2
              className="text-xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/product/${rel.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="relative h-40 overflow-hidden bg-gray-50">
                    <Image
                      src={rel.image}
                      alt={rel.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="25vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">{rel.category}</p>
                    <p className="font-bold text-xs text-gray-800 line-clamp-2 mb-2">{rel.name}</p>
                    <p className="font-extrabold text-primary text-sm">Rs.&nbsp;{rel.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}
