"use client";

import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/header/Header";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Condiciona a renderização do Header apenas quando não for a página Home
  const shouldShowHeader = pathname !== "/";

  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      lang="en"
    >
      <body>
        {shouldShowHeader && <Header />}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
