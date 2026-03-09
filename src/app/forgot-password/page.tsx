"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="text-4xl">🧸</span>
          <span className="text-3xl font-bold text-primary" style={{ fontFamily: "var(--font-poppins)" }}>
            Toyhouse.lk
          </span>
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          {submitted ? (
            <div className="text-center">
              <span className="text-5xl block mb-4">📬</span>
              <h1 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
                Check your email
              </h1>
              <p className="text-sm text-gray-500 mb-6">
                If an account exists for <strong>{email}</strong>, we&apos;ve sent a password reset link.
                It expires in 15 minutes.
              </p>
              <Link
                href="/login"
                className="text-sm font-bold text-primary hover:text-primary-dk"
              >
                ← Back to sign in
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "var(--font-poppins)" }}>
                Forgot password?
              </h1>
              <p className="text-sm text-gray-400 mb-8">
                Enter your email and we&apos;ll send you a reset link.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                  <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors font-[inherit]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dk disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 mt-1"
                >
                  {loading ? "Sending…" : "Send Reset Link"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-400 mt-6">
                Remember your password?{" "}
                <Link href="/login" className="text-primary hover:text-primary-dk font-bold">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
