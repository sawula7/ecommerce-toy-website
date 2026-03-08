"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const navItems = [
  {
    label: "DIY Kits",
    children: [
      "Wooden Robot Kits",
      "3D City Builders",
      "Sailboat Kits",
      "Airplane Kits",
      "Animal Kits",
    ],
  },
  {
    label: "STEM Toys",
    children: [
      "Gears & Mechanics",
      "Science Kits",
      "Engineering Sets",
      "Coding Toys",
    ],
  },
  { label: "Wooden Toys", children: [] },
  { label: "DIY Puzzles", children: [] },
  {
    label: "Shop by Age",
    children: ["0–1 Years", "1–3 Years", "3–5 Years", "5+ Years"],
  },
  { label: "🏷️ Offers", children: [] },
];

export default function Header() {
  const { data: session, status } = useSession();
  const { totalItems, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userInitial = session?.user?.name?.[0]?.toUpperCase() ?? "?";

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      {/* Main header row */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4 flex-wrap">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-4xl">🧸</span>
          <div className="flex flex-col leading-none">
            <span
              className="text-2xl font-bold text-primary"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              EduToys
            </span>
            <span className="text-[10px] text-gray-400 tracking-widest font-semibold">
              LEARN · PLAY · GROW
            </span>
          </div>
        </Link>

        {/* Search */}
        <div className="flex flex-1 max-w-2xl border-2 border-gray-200 rounded-full overflow-hidden focus-within:border-primary transition-colors min-w-[180px]">
          <input
            type="text"
            placeholder="Search for DIY toys, puzzles, Montessori…"
            className="flex-1 px-5 py-2.5 text-sm outline-none font-[inherit]"
          />
          <button className="bg-primary hover:bg-primary-dk text-white px-5 text-base transition-colors">
            🔍
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 ml-auto">
          {/* Wishlist */}
          <a
            href="#"
            className="flex flex-col items-center px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors text-center"
          >
            <span className="text-xl leading-none">♡</span>
            <span className="text-[10px] text-gray-400 font-semibold mt-0.5">Wishlist</span>
          </a>

          {/* Account / User */}
          {status === "loading" ? (
            <div className="w-10 h-10 rounded-xl bg-gray-100 animate-pulse" />
          ) : session ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex flex-col items-center px-2 py-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name ?? "User"}
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-primary/40"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center">
                    {userInitial}
                  </div>
                )}
                <span className="text-[10px] text-gray-400 font-semibold mt-0.5 max-w-[60px] truncate">
                  {session.user?.name?.split(" ")[0]}
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 min-w-[180px] z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-800 truncate">{session.user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
                  </div>
                  <a href="#" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-lt hover:text-primary transition-colors">
                    My Account
                  </a>
                  <a href="#" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-lt hover:text-primary transition-colors">
                    My Orders
                  </a>
                  <a href="#" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-lt hover:text-primary transition-colors">
                    Wishlist
                  </a>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm font-bold text-gray-600 hover:text-primary px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-sm font-bold bg-primary hover:bg-primary-dk text-white px-4 py-2 rounded-full transition-colors"
              >
                Register
              </Link>
            </div>
          )}

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative flex flex-col items-center px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
            aria-label="Open cart"
          >
            <span className="text-xl leading-none">🛒</span>
            <span className="text-[10px] text-gray-400 font-semibold mt-0.5">Cart</span>
            {totalItems > 0 && (
              <span className="absolute top-1 right-1.5 bg-primary text-white text-[9px] font-bold min-w-[16px] h-4 px-0.5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-2xl ml-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {/* Nav bar */}
      <nav className={`bg-primary ${mobileOpen ? "block" : "hidden"} md:block`}>
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex flex-col md:flex-row md:items-center overflow-x-auto scrollbar-none">
            {navItems.map((item) => (
              <li key={item.label} className="relative group">
                <button
                  className="w-full text-left flex items-center justify-between md:justify-start gap-1 px-4 py-3 text-white text-sm font-bold whitespace-nowrap hover:bg-black/15 transition-colors"
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.label ? null : item.label)
                  }
                >
                  {item.label}
                  {item.children.length > 0 && (
                    <span className="text-xs opacity-70">▾</span>
                  )}
                </button>
                {item.children.length > 0 && (
                  <ul
                    className={`
                      md:hidden group-hover:md:block absolute left-0 top-full bg-white min-w-[200px] shadow-xl rounded-b-xl z-50 py-2
                      ${openDropdown === item.label ? "block" : "hidden"}
                      md:group-hover:block
                    `}
                  >
                    {item.children.map((child) => (
                      <li key={child}>
                        <a
                          href="#"
                          className="block px-5 py-2 text-sm text-gray-700 hover:bg-primary-lt hover:text-primary hover:pl-6 transition-all"
                        >
                          {child}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Close user menu on outside click */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
      )}
    </header>
  );
}
