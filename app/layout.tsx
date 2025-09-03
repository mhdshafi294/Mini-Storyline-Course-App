import { BookOpen, Home } from "lucide-react";
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
  title: "Mini Storyline Course App",
  description:
    "An interactive learning platform with videos, quizzes, and content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* suppressHydrationWarning is used to prevent hydration mismatches caused by browser extensions (Grammarly, etc.) that modify DOM attributes after server rendering */}
        {/* Global Navigation Header */}
        <header className="sticky top-0 z-50 w-full  dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="container mx-auto flex h-14 items-center px-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-xl text-gray-900 dark:text-white">
                  Course App
                </span>
              </Link>
            </div>

            <div className="flex flex-1 items-center justify-end space-x-4">
              <nav className="flex items-center space-x-2">
                <Link
                  href="/"
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="min-h-screen">{children}</main>

        {/* Global Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © 2025 Mini Storyline Course App. Built with Next.js and
                TypeScript.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Interactive learning platform with progress tracking and lazy
                loading.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
