import { Inter } from "next/font/google";
import "./globals.css";
import BackgroundEffect from "@/components/BackgroundEffect";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Scaliente - Votre Profit E-commerce Réel",
  description: "Arrêtez de deviner votre rentabilité. Scaliente centralise vos revenus et dépenses (Ads, COGS, Shipping) pour révéler votre vrai profit. Essai gratuit 24h.",
  keywords: ["profit e-commerce", "tracker profit", "rentabilité shopify", "suivi dépenses ads", "marge e-commerce", "dropshipping profit"],
  authors: [{ name: "Scaliente" }],
  creator: "Scaliente",
  metadataBase: new URL('https://scaliente.com'),
  openGraph: {
    title: "Scaliente - Votre Profit E-commerce Réel",
    description: "Arrêtez de deviner votre rentabilité. Scaliente centralise vos revenus et dépenses pour révéler votre vrai profit.",
    url: "https://scaliente.com",
    siteName: "Scaliente",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/scalienteog.png",
        width: 1200,
        height: 630,
        alt: "Scaliente - Profit Tracker E-commerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scaliente - Votre Profit E-commerce Réel",
    description: "Arrêtez de deviner. Voyez votre vrai profit en temps réel.",
    images: ["/scalienteog.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/mini.png', sizes: '32x32', type: 'image/png' },
      { url: '/mini.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/mini.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <BackgroundEffect />
        <main
          className="relative z-10 w-full min-h-screen"
          style={{
            isolation: 'isolate',
            transform: 'translateZ(0)',
          }}
        >
          {children}
        </main>
        <CookieConsent />
      </body>
    </html>
  );
}
