import { Geist, Poppins } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import { getDictionary } from "../i18n";
import { buildLocalizedAlternates } from "@/lib/localized-metadata";
import { SITE_URL, localizedUrl } from "@/lib/site";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["500", "600", "700"],
});

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    keywords: dict.metadata.keywords || [],
    authors: [{ name: "Scaliente" }],
    creator: "Scaliente",
    metadataBase: new URL(SITE_URL),
    alternates: buildLocalizedAlternates(lang, ''),
    openGraph: {
      title: dict.metadata.ogTitle,
      description: dict.metadata.ogDescription,
      url: localizedUrl(lang),
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
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/mini-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/mini-192.png', sizes: '192x192', type: 'image/png' },
      ],
      apple: '/mini-192.png',
    },
    verification: {
      ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
        ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
        : {}),
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
        : {}),
    },
  };
}

export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'de' }];
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Scaliente",
    "@id": `${SITE_URL}/#organization`,
    url: SITE_URL,
    logo: `${SITE_URL}/scalienteog.png`,
    description: "Scaliente is a profit tracking application for Shopify merchants. It reconciles orders, ad spend, product costs, shipping, fees and taxes in one dashboard.",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@scaliente.com",
      contactType: "customer service",
    },
    sameAs: ["https://apps.shopify.com/scaliente"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "1309 Coffeen Avenue STE 1200",
      addressLocality: "Sheridan",
      addressRegion: "Wyoming",
      postalCode: "82801",
      addressCountry: "US",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Scaliente",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: ["fr", "en", "de"],
  };

  return (
    <html lang={lang} className={`${geist.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* GA4 */}
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA4_ID}');`}
            </Script>
          </>
        )}
        {/* Microsoft Clarity */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="clarity-init" strategy="lazyOnload">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");`}
          </Script>
        )}
        <main
          className="relative min-h-screen w-full bg-[#09090b]"
        >
          {children}
        </main>
        <CookieConsent content={dict.cookieConsent} lang={lang} />
        <AnalyticsEvents />
      </body>
    </html>
  );
}
