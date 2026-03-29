import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
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
  title: "asra3.com | SaaS & Automation Solutions",
  description:
    "I build high-performance SaaS products and intelligent automation solutions that save your business time, reduce costs, and drive scalable growth.",
  keywords: [
    "asra3", "SaaS development", "automation solutions", "freelance developer",
    "custom software", "API integration", "workflow automation", "MVP development",
    "full-stack development", "startup developer",
  ],
  authors: [{ name: "asra3.com" }],
  openGraph: {
    title: "asra3.com | SaaS & Automation Solutions",
    description: "Transform your business with custom SaaS products and intelligent automation.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "asra3.com | SaaS & Automation Solutions",
    description: "Transform your business with custom SaaS products and intelligent automation.",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
