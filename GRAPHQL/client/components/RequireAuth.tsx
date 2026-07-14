"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, pathname, router]);

  if (loading) {
    return (
      <div className="px-8 py-16 text-center text-sm text-slate-400">
        Checking your session…
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}