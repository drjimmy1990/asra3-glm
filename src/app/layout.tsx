import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LocaleProvider } from "@/lib/i18n";

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://asra3.com"),
  title: "asra3.com | SaaS & Automation Solutions",
  description:
    "I build high-performance SaaS products and intelligent automation solutions that save your business time, reduce costs, and drive scalable growth.",
  keywords: [
    "asra3", "SaaS development", "automation solutions", "freelance developer",
    "custom software", "API integration", "workflow automation", "MVP development",
    "full-stack development", "startup developer",
  ],
  authors: [{ name: "asra3.com" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "asra3.com | SaaS & Automation Solutions",
    description: "Transform your business with custom SaaS products and intelligent automation.",
    type: "website",
    url: "https://asra3.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "asra3.com | SaaS & Automation Solutions",
    description: "Transform your business with custom SaaS products and intelligent automation.",
  },
  alternates: {
    canonical: "https://asra3.com",
    languages: {
      "en": "https://asra3.com/en",
      "ar": "https://asra3.com/ar",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // lang/dir are set as defaults here. The LocaleProvider (initialized with the
    // URL locale) updates document.documentElement.lang and .dir client-side.
    <html lang="en" dir="ltr" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${interSans.variable} ${spaceGrotesk.variable} ${geistMono.variable} ${notoArabic.variable} antialiased bg-background text-foreground relative`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <LocaleProvider>
            {children}
            <Toaster />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
