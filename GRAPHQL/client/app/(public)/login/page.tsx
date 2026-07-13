"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const result = await login(email, password);
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    const redirectTo = searchParams.get("from") || "/profile";
    router.push(redirectTo);
  }

  return (
    <main>
      <Navbar />

      <div className="px-8 py-16 flex justify-center">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
          <p className="text-slate-500 text-sm mb-8">Log in to your NovaTrend account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-500 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-slate-900 hover:bg-slate-700 transition-colors text-white py-2.5 rounded-md font-medium text-sm disabled:opacity-50"
            >
              {submitting ? "Logging in…" : "Log in"}
            </button>
          </form>

          <p className="text-sm text-slate-500 mt-6 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-orange-500 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}