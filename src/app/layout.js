import './globals.css';
import { SEO } from '../../next-seo.config';
import ClientLayout from '@/components/ClientLayout';

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta name="theme-color" content="#0083B0" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
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
      <body suppressHydrationWarning={true}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
