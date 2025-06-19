const title = 'Levroun Enterprises – Secure & Scalable Digital Solutions';
const description =
  'Levroun Enterprises builds secure websites, mobile apps, and custom software. Tailored for startups, businesses, and non-tech founders.';
const url = 'https://levroun.tech';

export const SEO = {
  title,
  description,
  canonical: url,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url,
    site_name: 'Levroun Enterprises',
    title,
    description,
    images: [
      {
        url: `${url}/images/og-banner.png`,
        width: 1200,
        height: 630,
        alt: 'Levroun Enterprises',
      },
    ],
  },
  twitter: {
    handle: '@levroun',
    site: '@levroun',
    cardType: 'summary_large_image',
  },
};

// For individual pages using next-seo
export const defaultSEO = {
  titleTemplate: '%s | Levroun Enterprises',
  defaultTitle: title,
  description,
  canonical: url,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url,
    site_name: 'Levroun Enterprises',
    images: [
      {
        url: `${url}/images/og-banner.png`,
        width: 1200,
        height: 630,
        alt: 'Levroun Enterprises',
      },
    ],
  },
  twitter: {
    handle: '@levroun',
    site: '@levroun',
    cardType: 'summary_large_image',
  },
};

// Example: For individual pages
import { NextSeo } from 'next-seo';

export default function ServicesPage() {
  return (
    <>
      <NextSeo
        title="Our Services"
        description="Full-stack web development, ERP applications, mobile development, SEO & digital marketing services."
        canonical="https://levroun.tech/service"
      />
      {/* Your page content */}
    </>
  );
}