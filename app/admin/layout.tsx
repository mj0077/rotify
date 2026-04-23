"use client";

import { SessionProvider } from "next-auth/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-zinc-950">
        {children}
      </div>
    </SessionProvider>
  );
}
