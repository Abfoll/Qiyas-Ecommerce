"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHeart,
  faCartShopping,
  faBars,
  faXmark,
  faChevronDown,
  faTruck,
  faTags,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/AuthContext";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Swap/wire this to your real categories query (e.g. CATEGORIES_QUERY)
const categories = [
  { name: "Fashion", slug: "fashion", dot: "bg-rose-400" },
  { name: "Electronics", slug: "electronics", dot: "bg-blue-400" },
  { name: "Beauty", slug: "beauty", dot: "bg-pink-400" },
  { name: "Fitness", slug: "fitness", dot: "bg-emerald-400" },
  { name: "Home Decor", slug: "home-decor", dot: "bg-amber-400" },
  { name: "Accessories", slug: "accessories", dot: "bg-violet-400" },
];

const announcements = [
  { icon: faTruck, text: "Free Worldwide Shipping Over $50" },
  { icon: faTags, text: "Summer Sale Up To 70% Off" },
  { icon: faBolt, text: "Limited Time Flash Deals" },
];

type NavbarProps = {
  cartCount?: number;
  wishlistCount?: number;
};

export default function Navbar({ cartCount = 0, wishlistCount = 0 }: NavbarProps) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((i) => (i + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSearchOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <>
      {/* Top promo bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white text-xs">
        <div className="px-8 h-9 flex items-center justify-center gap-2 relative overflow-hidden">
          {announcements.map((a, i) => (
            <div
              key={a.text}
              className={`absolute flex items-center gap-2 transition-all duration-500 ${
                i === announcementIndex
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <FontAwesomeIcon icon={a.icon} className="text-orange-400" />
              <span className="tracking-wide">{a.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`sticky top-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-lg shadow-md border-b border-slate-100"
            : "bg-white border-b border-slate-200"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold text-base shadow-sm shadow-orange-200 group-hover:scale-105 transition-transform">
            Q
          </span>
          <span className="text-xl font-extrabold tracking-tight">
            Qiyas<span className="text-orange-500">-Ecommerce</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
          {links.slice(0, 2).map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`relative px-3 py-2 rounded-lg transition-colors hover:text-slate-900 hover:bg-slate-50 ${
                  isActive(link.href) ? "text-slate-900" : ""
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-3 right-3 -bottom-[13px] h-0.5 rounded-full bg-orange-500 origin-left transition-transform duration-300 ${
                    isActive(link.href) ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            </li>
          ))}

          {/* Categories mega-menu */}
          <li
            className="relative"
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => setCategoriesOpen(false)}
          >
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors">
              Categories
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`text-[10px] transition-transform duration-300 ${
                  categoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                categoriesOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-1 pointer-events-none"
              }`}
            >
              <div className="grid grid-cols-2 gap-1 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/60 p-3 w-72">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </li>

          {links.slice(2).map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`relative px-3 py-2 rounded-lg transition-colors hover:text-slate-900 hover:bg-slate-50 ${
                  isActive(link.href) ? "text-slate-900" : ""
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-3 right-3 -bottom-[13px] h-0.5 rounded-full bg-orange-500 origin-left transition-transform duration-300 ${
                    isActive(link.href) ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            </li>
          ))}

          {user?.role === "admin" && (
            <li>
              <Link
                href="/admin"
                className="px-3 py-2 rounded-lg text-orange-500 hover:text-orange-600 hover:bg-orange-50 transition-colors"
              >
                Admin
              </Link>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-1.5 text-slate-600">
          {/* Expandable search */}
          <div ref={searchRef} className="relative flex items-center">
            <div
              className={`overflow-hidden transition-all duration-300 ${
                searchOpen ? "w-40 md:w-56 opacity-100 mr-2" : "w-0 opacity-0"
              }`}
            >
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products..."
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-full px-4 py-2 focus:outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>
            <button
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <FontAwesomeIcon icon={searchOpen ? faXmark : faSearch} />
            </button>
          </div>

          <Link
            href="/favorites"
            aria-label="Favorites"
            className="relative hidden sm:flex w-9 h-9 items-center justify-center rounded-full hover:bg-slate-100 hover:text-rose-500 transition-colors"
          >
            <FontAwesomeIcon icon={faHeart} />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-gradient-to-br from-orange-400 to-orange-600 text-white text-[10px] font-semibold leading-none rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            aria-label="Cart"
            className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <FontAwesomeIcon icon={faCartShopping} />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-gradient-to-br from-orange-400 to-orange-600 text-white text-[10px] font-semibold leading-none rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth — desktop */}
          <div className="hidden md:flex items-center ml-2">
            {loading ? null : user ? (
              <div className="flex items-center gap-3 text-sm">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white text-xs font-semibold flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="font-medium">{user.name.split(" ")[0]}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-slate-400 hover:text-slate-900 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-sm">
                <Link href="/login" className="font-medium hover:text-slate-900 transition-colors">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full font-medium shadow-sm shadow-orange-200 hover:shadow-md hover:shadow-orange-300 hover:-translate-y-0.5 transition-all"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Menu"
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors ml-1"
            onClick={() => setMobileOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl p-6 flex flex-col gap-6 overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold text-sm">
                  Q
                </span>
                <span className="text-lg font-extrabold">
                  Qiyas<span className="text-orange-500">-Ecommerce</span>
                </span>
              </div>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className="relative">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
              />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>

            <ul className="flex flex-col gap-1 text-sm text-slate-700">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`block py-2.5 px-3 rounded-xl font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-orange-50 text-orange-600"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {user?.role === "admin" && (
                <li>
                  <Link href="/admin" className="block py-2.5 px-3 text-orange-500 font-medium">
                    Admin
                  </Link>
                </li>
              )}
            </ul>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                Categories
              </p>
              <div className="grid grid-cols-2 gap-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-orange-600 py-2"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-100">
              {loading ? null : user ? (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white text-xs font-semibold flex items-center justify-center">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <Link href="/profile" className="font-medium">
                      {user.name.split(" ")[0]}
                    </Link>
                  </div>
                  <button onClick={logout} className="text-slate-400">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 text-sm">
                  <Link
                    href="/register"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center px-3 py-2.5 rounded-full font-medium shadow-sm shadow-orange-200"
                  >
                    Sign up
                  </Link>
                  <Link href="/login" className="text-center py-2 font-medium">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}