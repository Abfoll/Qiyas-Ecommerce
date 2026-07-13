"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tabs = ["Overview", "Orders", "Addresses", "Settings"] as const;

const recentOrders = [
  { id: "#NT-1042", date: "Jul 2, 2026", status: "Delivered", total: "$189.98" },
  { id: "#NT-1031", date: "Jun 18, 2026", status: "Shipped", total: "$59.99" },
  { id: "#NT-1019", date: "May 30, 2026", status: "Delivered", total: "$349.99" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Overview");

  return (
    <main>
      <Navbar />

      <div className="px-8 py-10 grid md:grid-cols-[220px_1fr] gap-10">
        <aside>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
              👤
            </div>
            <div>
              <p className="font-medium text-sm">Jordan Lee</p>
              <p className="text-xs text-slate-500">jordan@example.com</p>
            </div>
          </div>

          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`block w-full text-left text-sm px-3 py-2 rounded-md transition-colors ${
                  activeTab === tab
                    ? "bg-orange-50 text-orange-600 font-medium"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </aside>

        <section>
          {activeTab === "Overview" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Account overview</h1>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-slate-500 mt-1">Orders placed</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-xs text-slate-500 mt-1">Saved favorites</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                  <p className="text-2xl font-bold">$1,240</p>
                  <p className="text-xs text-slate-500 mt-1">Lifetime spend</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Orders" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Order history</h1>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-left">
                    <tr>
                      <th className="px-4 py-3 font-medium">Order</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((o) => (
                      <tr key={o.id} className="border-t border-slate-200">
                        <td className="px-4 py-3">{o.id}</td>
                        <td className="px-4 py-3 text-slate-500">{o.date}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded">
                            {o.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-medium">{o.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "Addresses" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Saved addresses</h1>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 max-w-sm">
                <p className="font-medium text-sm mb-1">Home</p>
                <p className="text-sm text-slate-500">
                  123 Market Street, Apt 4B
                  <br />
                  San Francisco, CA 94103
                </p>
              </div>
            </div>
          )}

          {activeTab === "Settings" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Settings</h1>
              <div className="space-y-4 max-w-sm">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Full name</label>
                  <input
                    defaultValue="Jordan Lee"
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Email</label>
                  <input
                    defaultValue="jordan@example.com"
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                <button className="bg-slate-900 text-white text-sm px-4 py-2 rounded-md">
                  Save changes
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}