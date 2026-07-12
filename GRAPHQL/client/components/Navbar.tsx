import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
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
        <Link href="/profile" aria-label="Profile">
          👤
        </Link>
        <Link href="/cart" aria-label="Cart">
          🛒
        </Link>
      </div>
    </nav>
  );
}