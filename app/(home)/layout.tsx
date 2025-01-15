'use client';

import { Navbar } from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen">
      <Navbar />
      <Sidebar />
      <div className="flex-1">
        {children}
      </div>
    </main>
  );
} 