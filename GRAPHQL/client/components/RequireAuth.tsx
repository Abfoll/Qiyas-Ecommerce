"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

export default function RequireAuth({
  children,
  adminOnly = false,
}: {
  children: ReactNode;
  adminOnly?: boolean;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push(`/login?from=${encodeURIComponent(pathname)}`);
      return;
    }

    if (adminOnly && user.role !== "admin") {
      router.push("/");
    }
  }, [loading, user, adminOnly, pathname, router]);

  if (loading) {
    return (
      <div className="px-8 py-16 text-center text-sm text-slate-400">
        Checking your session…
      </div>
    );
  }

  if (!user || (adminOnly && user.role !== "admin")) {
    return null;
  }

  return <>{children}</>;
}