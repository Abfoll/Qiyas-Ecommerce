import React from "react";
// Import icons from lucide-react (standard for this look)
// npm install lucide-react
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, Twitter } from "lucide-react";

const badges = [
  { icon: "✓", title: "Premium Quality", subtitle: "Made with the finest materials" },
  { icon: "🚚", title: "Fast Delivery", subtitle: "Quick and reliable shipping" },
  { icon: "🔒", title: "Secure Checkout", subtitle: "Your data is protected" },
  { icon: "★", title: "Customer Satisfaction", subtitle: "100% satisfaction guarantee" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-slate-900 font-sans border-t border-slate-100">
      {/* 1. Trust Badges Section (Matches the bottom of your image) */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-slate-100">
        {badges.map((b) => (
          <div key={b.title} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-xl">
              {b.icon}
            </div>
            <div>
              <p className="font-bold text-sm uppercase tracking-tight">{b.title}</p>
              <p className="text-xs text-slate-500 mt-1">{b.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand Column */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black tracking-tighter">NovaTrend</h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
            Discover products you'll love. Curating the latest trending products for modern lifestyles.
          </p>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/abenezer-teketel-020b5b3b4" target="_blank" className="p-2 bg-slate-100 rounded-full hover:bg-orange-600 hover:text-white transition-all">
              <Linkedin size={18} />
            </a>
            <a href="#" className="p-2 bg-slate-100 rounded-full hover:bg-orange-600 hover:text-white transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="p-2 bg-slate-100 rounded-full hover:bg-orange-600 hover:text-white transition-all">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-6">Shop</h3>
          <ul className="space-y-4 text-sm text-slate-500 font-medium">
            <li><a href="#" className="hover:text-orange-600 transition-colors">New Arrivals</a></li>
            <li><a href="#" className="hover:text-orange-600 transition-colors">Best Sellers</a></li>
            <li><a href="#" className="hover:text-orange-600 transition-colors">Men's Collection</a></li>
            <li><a href="#" className="hover:text-orange-600 transition-colors">Women's Collection</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-6">Support</h3>
          <ul className="space-y-4 text-sm text-slate-500 font-medium">
            <li><a href="#" className="hover:text-orange-600 transition-colors">Order Tracking</a></li>
            <li><a href="#" className="hover:text-orange-600 transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-orange-600 transition-colors">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-orange-600 transition-colors">FAQs</a></li>
          </ul>
        </div>

        {/* Contact Details Section */}
        <div>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-6">Get in Touch</h3>
          <ul className="space-y-4 text-sm text-slate-600">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-orange-600 shrink-0" />
              <span>Bole Rwanda, Addis Ababa, Ethiopia</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-orange-600 shrink-0" />
              <a href="tel:+251902913860" className="hover:text-orange-600">+251 902 913 860</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-orange-600 shrink-0" />
              <a href="mailto:abenezerteketel7@gmail.com" className="hover:text-orange-600">abenezerteketel7@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Bottom Copyright Bar */}
      <div className="border-t border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
          <p>© {currentYear} NOVATREND. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Service</a>
            <a href="#" className="hover:text-slate-900">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}