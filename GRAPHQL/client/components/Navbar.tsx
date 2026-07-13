"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const { user, loading, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-200">
      <Link href="/" className="text-xl font-bold">
        NovaTrend
      </Link>

      <ul className="hidden md:flex gap-6 text-sm text-slate-600">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="hover:text-slate-900 transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-5 text-slate-600">
        <Link href="/search" aria-label="Search">
          🔍
        </Link>
        <Link href="/favorites" aria-label="Favorites">
          ♡
        </Link>
        <Link href="/cart" aria-label="Cart">
          🛒
        </Link>

        {loading ? null : user ? (
          <div className="flex items-center gap-3 text-sm">
            <Link href="/profile" className="hover:text-slate-900 transition-colors">
              {user.name.split(" ")[0]}
            </Link>
            <button onClick={logout} className="text-slate-400 hover:text-slate-900 transition-colors">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-sm">
            <Link href="/login" className="hover:text-slate-900 transition-colors">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-slate-900 text-white px-3 py-1.5 rounded-md hover:bg-slate-700 transition-colors"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}