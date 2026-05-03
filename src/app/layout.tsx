import type { Metadata, Viewport } from 'next';
import { Cairo, Tajawal, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { BRAND } from '@/lib/brand';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { CustomCursor } from '@/components/effects/custom-cursor';
import { ToastHost } from '@/components/ui/toast';
import './globals.css';

// Arabic-friendly fonts
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  variable: '--font-tajawal',
  display: 'swap',
  weight: ['400', '500', '700', '800', '900'],
});

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  variable: '--font-ibm-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: `${BRAND.name} — ${BRAND.ar.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description: BRAND.ar.manifesto,
  applicationName: BRAND.name,
  keywords: [
    'ألعاب',
    'رياضات إلكترونية',
    'مفرش فأرة',
    'إضاءة RGB',
    'أغطية مفاتيح',
    'هودي جيمنج',
    'كرسي ألعاب',
    'معدات سايبربانك',
    'RYZE',
    'gaming',
    'esports',
  ],
  authors: [{ name: BRAND.name }],
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    title: `${BRAND.name} — ${BRAND.ar.tagline}`,
    description: BRAND.ar.manifesto,
    siteName: BRAND.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} — ${BRAND.ar.tagline}`,
    description: BRAND.ar.manifesto,
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
    <html 
      lang="ar" 
      dir="rtl" 
      suppressHydrationWarning 
      className={`${cairo.variable} ${tajawal.variable} ${ibmArabic.variable}`}
    >
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
