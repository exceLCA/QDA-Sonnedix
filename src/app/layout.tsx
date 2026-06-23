import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavTabs from "@/components/NavTabs";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Quality Document Analyzer | Sonnedix Italy",
  description: "AI-powered compliance analysis for Sonnedix Italy project documents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-surface antialiased`}
      >
        <Header />
        <NavTabs />
        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
