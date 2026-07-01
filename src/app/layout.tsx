import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
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
    locale: "es_ES",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-white text-[#141534]`}
      >
        {children}
      </body>
    </html>
  );
}
