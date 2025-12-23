import { Inter } from "next/font/google";
import "./globals.css";
import BackgroundEffect from "@/components/BackgroundEffect";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Scaliente - Scale Your Ecom Business",
  description: "The ultimate platform for e-commerce growth.",
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
    <html lang="en" suppressHydrationWarning>
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
      </body>
    </html>
  );
}
