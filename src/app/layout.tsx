import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import MobileCTAs from "@/components/MobileCTAs";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${COMPANY_NAME} | Representación para Vendedores en Puerto Rico`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description:
    "Christian Caballer representa propietarios, herederos y vendedores de bienes raíces en Puerto Rico. Orientación clara para tomar buenas decisiones de venta.",
  keywords: [
    "bienes raíces Puerto Rico",
    "vender propiedad Puerto Rico",
    "agente de bienes raíces",
    "Christian Caballer",
    "Caba Group",
    "propiedad heredada Puerto Rico",
    "vender casa Puerto Rico",
  ],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: `${COMPANY_NAME} | Representación para Vendedores en Puerto Rico`,
    description:
      "Christian Caballer representa propietarios, herederos y vendedores de bienes raíces en Puerto Rico.",
    type: "website",
    locale: "es_PR",
    url: SITE_URL,
    siteName: COMPANY_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: COMPANY_NAME,
    description: "Representación enfocada en vendedores en Puerto Rico.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <Navigation />
        <main>{children}</main>
        <MobileCTAs />
      </body>
    </html>
  );
}
