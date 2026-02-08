import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Movie School",
  description: "A 12-week worldview level-up taught through cinema.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} bg-[#06060a] font-body text-white antialiased`}>
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(255,144,92,0.2),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(91,167,255,0.2),transparent_35%),linear-gradient(160deg,#06060a,#11131b_42%,#09090f)]" />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
