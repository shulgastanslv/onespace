import { Providers } from "./providers";
import Sidebar from "@/components/Sidebar";
import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Onespace",
  description: "Onespace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6 mt-16">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
