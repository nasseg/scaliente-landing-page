import { Poppins } from "next/font/google";
import "../globals.css";
import BackgroundEffect from "@/components/BackgroundEffect";
import CookieConsent from "@/components/CookieConsent";
import { getDictionary } from "../i18n";

// Unified font system - Poppins for everything
// Beautiful geometric sans-serif with excellent readability
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    keywords: ["profit e-commerce", "tracker profit", "rentabilité shopify", "suivi dépenses ads", "marge e-commerce", "dropshipping profit"],
    authors: [{ name: "Scaliente" }],
    creator: "Scaliente",
    metadataBase: new URL('https://scaliente.com'),
    openGraph: {
      title: dict.metadata.ogTitle,
      description: dict.metadata.ogDescription,
      url: `https://scaliente.com/${lang}`,
      siteName: "Scaliente",
      locale: lang === 'fr' ? 'fr_FR' : (lang === 'de' ? 'de_DE' : 'en_US'),
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
      title: dict.metadata.twitterTitle,
      description: dict.metadata.twitterDescription,
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
}

export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'de' }];
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={poppins.variable} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <BackgroundEffect />
        <main
          className="relative w-full min-h-screen"
          style={{
            position: 'relative',
            zIndex: 2,
          }}
        >
          {children}
        </main>
        <CookieConsent content={dict.cookieConsent} lang={lang} />
      </body>
    </html>
  );
}
