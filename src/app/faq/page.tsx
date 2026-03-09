"use client";

import { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const faqs = [
  {
    category: "Orders & Shipping",
    icon: "🚚",
    questions: [
      {
        q: "Do you deliver island-wide in Sri Lanka?",
        a: "Yes! We deliver to all districts in Sri Lanka. A flat delivery fee of Rs. 350 applies to all orders, regardless of location.",
      },
      {
        q: "How long does delivery take?",
        a: "Standard delivery takes 3–5 business days. Remote areas may take up to 7 business days. You will receive a confirmation message once your order is dispatched.",
      },
      {
        q: "Can I place an order over the phone?",
        a: "Yes, you can call us on 0777489034 (Monday–Saturday, 9am–6pm) and our team will assist you in placing an order.",
      },
      {
        q: "Do you offer cash on delivery?",
        a: "Yes, we accept Cash on Delivery (COD) for all orders island-wide. We also accept card payments and bank transfers.",
      },
      {
        q: "How will I know my order has been placed successfully?",
        a: "Once your order is placed, you will receive an on-screen confirmation with an order number. You will also receive a confirmation via email or WhatsApp if you provided those details.",
      },
    ],
  },
  {
    category: "Products",
    icon: "🧸",
    questions: [
      {
        q: "Are your toys safe for children?",
        a: "Absolutely. All our products are made from non-toxic, child-safe materials. Our wooden toys use food-safe, water-based paints and are CE certified. We comply with international toy safety standards.",
      },
      {
        q: "What age groups are your toys suitable for?",
        a: "We stock products for children aged 1 and above. Each product listing clearly states the recommended age range. We recommend always supervising young children (under 3 years) during play.",
      },
      {
        q: "Are the wooden toys eco-friendly?",
        a: "Yes. We use sustainably sourced wood including basswood, rubber wood, and birch plywood. Our packaging is also eco-conscious, using minimal plastic.",
      },
      {
        q: "Do DIY kits require adult assistance?",
        a: "It depends on the kit and the child's age. Kits for younger children (5–7 years) are designed for adult-assisted assembly. Kits for older children (8+) are largely self-guided with step-by-step instructions included.",
      },
      {
        q: "Can I buy replacement parts for a product?",
        a: "Yes, in many cases we can supply replacement parts. Please contact us with your order details and the specific part required. Availability may vary by product.",
      },
      {
        q: "Do you have products for children with special needs?",
        a: "Yes. We carry a range of Montessori materials and sensory toys designed to support children with various learning needs. Please contact us for personalised recommendations.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    icon: "↩️",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 7 days of delivery for unused items in original condition. Please contact us before sending anything back. See our full Refund & Returns Policy for details.",
      },
      {
        q: "What if I receive a damaged or wrong item?",
        a: "We're sorry! Please contact us within 48 hours of receiving your order with photos of the issue. We will arrange a replacement or full refund at no cost to you.",
      },
      {
        q: "Can I exchange a product?",
        a: "Yes, we offer exchanges within the 7-day return window, subject to stock availability. If the replacement item is of a higher value, the price difference will need to be settled.",
      },
      {
        q: "How long does a refund take?",
        a: "Once we receive and inspect the returned item, refunds are processed within 3–5 business days. Card refunds may take an additional 5–7 business days to appear on your statement.",
      },
    ],
  },
  {
    category: "Payments",
    icon: "💳",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Cash on Delivery (COD), Visa/Mastercard debit and credit cards, and direct bank transfers to our Commercial Bank of Ceylon account.",
      },
      {
        q: "Is it safe to pay online on your website?",
        a: "Yes. Our website uses SSL encryption to protect all payment transactions. We do not store your card details on our servers.",
      },
      {
        q: "Can I pay in instalments?",
        a: "We are working on introducing instalment payment options. Currently, all orders must be paid in full at checkout or upon delivery.",
      },
    ],
  },
  {
    category: "Store & Contact",
    icon: "🏬",
    questions: [
      {
        q: "Do you have a physical store?",
        a: "Yes! You are welcome to visit us at 281/D/5, St Marys Road, Welivita, Kaduwela. Store hours: Monday–Saturday 9am–6pm, Sunday 10am–4pm.",
      },
      {
        q: "How can I contact customer support?",
        a: "You can reach us by phone at 0777489034 (Mon–Sat, 9am–6pm), by email at info@toyhouse.lk, or via WhatsApp at the same number. We aim to respond within 1 business day.",
      },
      {
        q: "Do you offer bulk or school orders?",
        a: "Yes! We supply schools, preschools, and educational institutions with bulk quantities. Please contact us directly for pricing, availability, and delivery arrangements for large orders.",
      },
      {
        q: "Do you offer gift wrapping?",
        a: "Yes, we offer gift wrapping on request at a small additional charge. Please add a note at checkout or contact us after placing your order.",
      },
    ],
  },
];

export default function FaqPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? faqs.map((cat) => ({
        ...cat,
        questions: cat.questions.filter(
          (faq) =>
            faq.q.toLowerCase().includes(search.toLowerCase()) ||
            faq.a.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter((cat) => cat.questions.length > 0)
    : faqs;

  function toggle(key: string) {
    setOpenItem((prev) => (prev === key ? null : key));
  }

  return (
    <>
    <TopBar />
    <Header />
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <span className="text-4xl block mb-4">❓</span>
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            Can't find your answer? <a href="tel:0777489034" className="text-primary font-semibold hover:underline">Call us on 0777489034</a>
          </p>
          <div className="flex items-center justify-center gap-2 mb-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors font-semibold">Home</Link>
            <span>›</span>
            <span>FAQ</span>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search questions…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 border-2 border-gray-200 focus:border-primary rounded-2xl text-sm outline-none transition-colors font-[inherit]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-5xl block mb-4">🤔</span>
            <p className="font-bold text-gray-700 mb-2">No results found</p>
            <p className="text-gray-400 text-sm">Try a different search term or <a href="tel:0777489034" className="text-primary hover:underline">call us</a> for help.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {filtered.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <h2
                    className="text-lg font-bold text-gray-900"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {cat.category}
                  </h2>
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
                  {cat.questions.map((faq, idx) => {
                    const key = `${cat.category}-${idx}`;
                    const isOpen = openItem === key;
                    return (
                      <div key={key}>
                        <button
                          onClick={() => toggle(key)}
                          className="w-full flex items-start justify-between gap-4 px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-sm text-gray-800 leading-snug">{faq.q}</span>
                          <span
                            className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all mt-0.5 ${
                              isOpen ? "border-primary bg-primary text-white" : "border-gray-200 text-gray-400"
                            }`}
                          >
                            <span className="text-xs font-bold leading-none">{isOpen ? "−" : "+"}</span>
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-5">
                            <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-primary pl-3">
                              {faq.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Still need help */}
        <div className="mt-12 bg-primary rounded-3xl p-8 text-center text-white">
          <span className="text-4xl block mb-3">💬</span>
          <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
            Still have a question?
          </h3>
          <p className="text-primary-lt text-sm mb-6">
            Our friendly team is happy to help Monday–Saturday, 9am–6pm.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="tel:0777489034"
              className="bg-white text-primary font-bold px-6 py-3 rounded-full text-sm hover:bg-gray-100 transition-colors"
            >
              📞 Call 0777489034
            </a>
            <a
              href="mailto:info@toyhouse.lk"
              className="bg-white/20 text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-white/30 transition-colors"
            >
              ✉️ Email Us
            </a>
          </div>
        </div>

        {/* Related links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: "/refund-returns", icon: "↩️", label: "Refund & Returns Policy" },
            { href: "/privacy-policy", icon: "🔒", label: "Privacy Policy" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-primary hover:shadow-md transition-all group"
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="font-bold text-sm text-gray-700 group-hover:text-primary transition-colors">{link.label}</span>
              <span className="ml-auto text-gray-300 group-hover:text-primary">›</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
