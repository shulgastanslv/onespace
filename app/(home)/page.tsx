'use client';

import Sidebar from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
      </div>
    </main>
  );
}
