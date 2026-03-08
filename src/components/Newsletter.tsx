"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10 flex-wrap">
        <div>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-2"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Stay in the Loop!
          </h2>
          <p className="text-white/80 text-sm max-w-md">
            Subscribe for exclusive offers, new DIY kit arrivals, free printable resources, and parenting tips.
          </p>
        </div>
        {submitted ? (
          <div className="bg-white/20 text-white font-bold rounded-2xl px-8 py-4 text-center">
            🎉 Thanks for subscribing!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex gap-3 flex-wrap"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address…"
              required
              className="px-6 py-3 rounded-full min-w-[280px] text-sm outline-none font-[inherit] border-2 border-transparent focus:border-white"
            />
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-700 text-white font-bold px-7 py-3 rounded-full text-sm transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
