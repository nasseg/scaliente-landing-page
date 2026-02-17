import { Poppins } from "next/font/google";
import Script from "next/script";
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
    keywords: dict.metadata.keywords || [],
    authors: [{ name: "Scaliente" }],
    creator: "Scaliente",
    metadataBase: new URL('https://scaliente.com'),
    alternates: {
      canonical: `https://scaliente.com/${lang}`,
      languages: {
        'fr': 'https://scaliente.com/fr',
        'en': 'https://scaliente.com/en',
        'de': 'https://scaliente.com/de',
        'x-default': 'https://scaliente.com/fr',
      },
    },
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Scaliente",
    url: "https://scaliente.com",
    logo: "https://scaliente.com/scalienteog.png",
    description: "Scaliente is a real-time profit tracking SaaS for Shopify e-commerce merchants. It automatically deducts ads, COGS, and shipping to show your true net profit.",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@scaliente.com",
      contactType: "customer service",
    },
    sameAs: ["https://x.com/scaliente", "https://linkedin.com/company/scaliente"],
  };

  return (
    <html lang={lang} className={poppins.variable} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
