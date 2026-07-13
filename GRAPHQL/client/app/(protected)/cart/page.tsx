"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";

type CartLine = { id: string; qty: number };

export default function CartPage() {
  const [lines, setLines] = useState<CartLine[]>([
    { id: "1", qty: 1 },
    { id: "3", qty: 2 },
  ]);

  const cartItems = lines
    .map((line) => {
      const product = products.find((p) => p.id === line.id);
      return product ? { ...product, qty: line.qty } : null;
    })
    .filter(Boolean) as (typeof products[number] & { qty: number })[];

  function updateQty(id: string, qty: number) {
    if (qty < 1) return;
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty } : l)));
  }

  function removeItem(id: string) {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 6.99;
  const total = subtotal + shipping;

  return (
    <main>
      <Navbar />

      <div className="px-8 py-10">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-slate-400 text-sm py-16 text-center">Your cart is empty.</p>
        ) : (
          <div className="grid md:grid-cols-[1fr_320px] gap-10">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border border-slate-200 rounded-lg p-4"
                >
                  <div className="w-20 h-20 shrink-0 bg-slate-100 rounded flex items-center justify-center text-slate-400 text-xs">
                    image
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-slate-500 mb-2">{item.category}</p>
                    <p className="font-semibold text-sm">${item.price}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-7 h-7 border border-slate-200 rounded-md text-sm"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-7 h-7 border border-slate-200 rounded-md text-sm"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-slate-400 hover:text-red-500 text-sm ml-2"
                    aria-label={`Remove ${item.name}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="border border-slate-200 rounded-lg p-6 h-fit">
              <h2 className="font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
              </div>
              <div className="flex justify-between font-semibold border-t border-slate-200 pt-4 mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-orange-500 hover:bg-orange-600 transition-colors text-white py-3 rounded-md font-medium">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}