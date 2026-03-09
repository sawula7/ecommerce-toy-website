"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  if (!token) {
    return (
      <div className="text-center">
        <span className="text-5xl block mb-4">🔗</span>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Invalid link</h1>
        <p className="text-sm text-gray-400 mb-6">This reset link is missing or malformed.</p>
        <Link href="/forgot-password" className="text-sm font-bold text-primary hover:text-primary-dk">
          Request a new one
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setDone(true);
      setTimeout(() => router.push("/login"), 3000);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="text-center">
        <span className="text-5xl block mb-4">✅</span>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Password updated!</h1>
        <p className="text-sm text-gray-400">Redirecting you to sign in…</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "var(--font-poppins)" }}>
        Set new password
      </h1>
      <p className="text-sm text-gray-400 mb-8">Choose a strong password for your account.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
            {error}{" "}
            {error.includes("expired") && (
              <Link href="/forgot-password" className="font-bold underline">
                Request a new link
              </Link>
            )}
          </div>
        )}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">New password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters"
            required
            minLength={8}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors font-[inherit]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repeat your password"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors font-[inherit]"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-dk disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 mt-1"
        >
          {loading ? "Updating…" : "Update Password"}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
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
          <Suspense fallback={<div className="text-gray-400 text-sm animate-pulse">Loading…</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
