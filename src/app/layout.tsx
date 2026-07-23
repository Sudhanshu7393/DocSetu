import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "DocSetu – Making Official Documents Easy",
    template: "%s | DocSetu",
  },
  description:
    "Create official documents online in minutes. Guided step-by-step questionnaires. Download professional PDF and DOCX. Rent agreements, affidavits, NDAs, offer letters and more.",
  keywords: [
    "document creation",
    "rent agreement",
    "affidavit",
    "legal documents",
    "India",
    "official documents",
    "NDA",
    "offer letter",
    "income certificate",
  ],
  authors: [{ name: "DocSetu" }],
  creator: "DocSetu Technologies",
  metadataBase: new URL("https://docsetu.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://docsetu.in",
    siteName: "DocSetu",
    title: "DocSetu – Making Official Documents Easy",
    description:
      "India's trusted guided document creation platform. Create official documents online in minutes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocSetu – Making Official Documents Easy",
    description: "Create official documents online in minutes. Professional PDFs guaranteed.",
    creator: "@docsetu",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
