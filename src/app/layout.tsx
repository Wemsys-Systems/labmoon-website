import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL("https://labmoon.eu"),
  title: {
    template: "%s | Labmoon",
    default: "Labmoon | Peritaje Blockchain y Análisis Forense Cripto",
  },
  description: "Firma especializada en investigación de fraudes, rastreo de criptomonedas, peritaje informático blockchain y consultoría legal para activos digitales en España y Europa.",
  keywords: ["peritaje blockchain", "rastreo criptomonedas", "análisis forense cripto", "estafas cripto", "recuperación fondos blockchain", "perito judicial criptomonedas", "inteligencia financiera", "Web3"],
  authors: [{ name: "Labmoon" }],
  creator: "Labmoon",
  publisher: "Labmoon",
  openGraph: {
    title: "Labmoon | Análisis Forense y Peritaje Blockchain",
    description: "Descubriendo la verdad en cada bloque. Expertos europeos en rastreo de activos digitales e informes periciales.",
    url: "https://labmoon.eu",
    siteName: "Labmoon",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Labmoon Peritaje Blockchain",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Labmoon | Peritaje Blockchain",
    description: "Expertos en rastreo de criptomonedas y análisis forense judicial.",
    images: ["/logo.png"],
    creator: "@InfoLabmoon",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#141534",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Labmoon",
  url: "https://labmoon.eu",
  logo: "https://labmoon.eu/logo.png",
  description: "Blockchain forensic analysis, cryptocurrency tracing, and crypto judicial expert reports.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "",
    contactType: "customer service",
    email: "info@labmoon.eu",
    availableLanguage: ["Spanish", "English"],
  },
  sameAs: [
    "https://twitter.com/InfoLabmoon",
    "https://linkedin.com/company/labmoon",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-white text-[#141534]`}
      >
        {children}
      </body>
    </html>
  );
}
