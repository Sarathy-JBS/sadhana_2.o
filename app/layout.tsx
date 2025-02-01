import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sadhana Tracker",
  description: "Track your daily Sadhana activities efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}
      >
        {/* ✅ Navigation Bar */}
        <nav className="p-4 bg-gray-800 shadow-lg flex justify-center gap-6">
          <Link href="/" className="text-lg font-bold hover:underline">
            📋 Form
          </Link>
          <Link href="/sadhana" className="text-lg font-bold hover:underline">
            📄 View Sadhana
          </Link>
          <Link href="/dashboard" className="text-lg font-bold hover:underline">
            📊 Dashboard
          </Link>
        </nav>

        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
