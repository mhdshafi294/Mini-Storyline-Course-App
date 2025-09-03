import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
        <Providers>
          {/* suppressHydrationWarning is used to prevent hydration mismatches caused by browser extensions (Grammarly, etc.) that modify DOM attributes after server rendering */}
          <Header />

          {/* Main Content */}
          <main className="min-h-screen">{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
