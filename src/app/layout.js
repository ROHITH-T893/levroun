import './globals.css';
import { SEO } from '../../next-seo.config';
import ClientLayout from '@/components/ClientLayout';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import MobileNavigation from '@/components/MobileNavigation';

export const metadata = {
  metadataBase: new URL('https://levroun.tech'),
  title: SEO.title,
  description: SEO.description,
  keywords: 'Levroun, web development, app development, ERP, custom solutions, e-commerce, India',
  openGraph: {
    title: 'Levroun Enterprises – Secure & Scalable Digital Solutions',
    description: 'Levroun Enterprises builds secure websites, mobile apps, and custom software. Tailored for startups, businesses, and non-tech founders.',
    type: 'website',
    images: [
      {
        url: '/images/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Levroun Enterprises - Building secure, scalable digital platforms for businesses',
        type: 'image/png',
      }
    ],
    url: 'https://levroun.tech',
    siteName: 'Levroun Enterprises',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Levroun Enterprises – Secure & Scalable Digital Solutions',
    description: 'Building secure websites, mobile apps, and custom software for businesses.',
    images: ['/images/og-banner.png'],
  },
  alternates: {
    canonical: 'https://levroun.tech',
  },
};

import NeuralBackground from '@/components/NeuralBackground';
import VisitorTracker from '@/components/VisitorTracker';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta name="theme-color" content="#06060c" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Righteous&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body suppressHydrationWarning={true} className="bg-[#06060c] text-[#e2e8f0]">
        <VisitorTracker />
        <NeuralBackground />
        <ClientLayout>
          <div id="global_layout_container" className="flex flex-col min-h-screen">
            <span className="mobile_nav_global lg:hidden">
              <MobileNavigation />
            </span>
            <span className="desktop_nav_global hidden lg:block">
              <Nav />
            </span>
            <main className="flex-grow pt-[80px]">{children}</main>
            <Footer />
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
