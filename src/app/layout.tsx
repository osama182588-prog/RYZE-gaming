import type { Metadata, Viewport } from 'next';
import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google';
import { BRAND } from '@/lib/brand';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { CustomCursor } from '@/components/effects/custom-cursor';
import { ToastHost } from '@/components/ui/toast';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
  weight: ['500', '700', '900'],
});
const jet = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description: BRAND.manifesto,
  applicationName: BRAND.name,
  keywords: [
    'gaming',
    'esports',
    'mousepad',
    'rgb',
    'keycaps',
    'gaming hoodie',
    'gaming chair',
    'cyberpunk gear',
    'RYZE',
  ],
  authors: [{ name: BRAND.name }],
  openGraph: {
    type: 'website',
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.manifesto,
    siteName: BRAND.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.manifesto,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#05060a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${orbitron.variable} ${jet.variable}`}>
      <body>
        {/* Cinematic background stack */}
        <div className="aurora-bg" aria-hidden />
        <div className="grid-overlay" aria-hidden />
        <div className="noise-overlay" aria-hidden />

        <CustomCursor />
        <Navbar />
        <main className="relative pt-24 page-fade-in">{children}</main>
        <Footer />
        <CartDrawer />
        <ToastHost />
      </body>
    </html>
  );
}
