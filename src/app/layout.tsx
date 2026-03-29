import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SaaS & Automation Solutions | Freelance Developer",
  description:
    "I build high-performance SaaS products and intelligent automation solutions that save your business time, reduce costs, and drive scalable growth. Let's turn your vision into reality.",
  keywords: [
    "SaaS development",
    "automation solutions",
    "freelance developer",
    "custom software",
    "API integration",
    "workflow automation",
    "MVP development",
    "full-stack development",
    "startup developer",
    "no-code automation",
  ],
  authors: [{ name: "Freelance SaaS & Automation Expert" }],
  openGraph: {
    title: "SaaS & Automation Solutions | Freelance Developer",
    description:
      "Transform your business with custom SaaS products and intelligent automation. From MVP to scale.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS & Automation Solutions",
    description:
      "Transform your business with custom SaaS products and intelligent automation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
