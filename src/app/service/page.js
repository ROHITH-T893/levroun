

export const metadata = {
  title: 'Our Services - Web Development, Mobile Apps & ERP Solutions | Levroun Enterprises',
  description: 'Professional web development, mobile app development, ERP solutions, e-commerce platforms, and digital marketing services by Levroun Enterprises.',
  keywords: 'web development services, mobile app development, ERP solutions, e-commerce development, custom software, digital marketing, India',
  openGraph: {
    title: 'Our Services - Levroun Enterprises',
    description: 'Professional web development, mobile app development, ERP solutions, e-commerce platforms, and digital marketing services.',
    type: 'website',
    images: ['/images/og-banner.png'],
    url: 'https://levroun.tech/service',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services - Levroun Enterprises',
    description: 'Professional web development, mobile app development, ERP solutions, e-commerce platforms, and digital marketing services.',
  },
  alternates: {
    canonical: 'https://levroun.tech/service',
  },
};

export default function ServicesPage() {
  const services = [
    {
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies like React, Next.js, and Node.js.',
      features: ['Responsive Design', 'SEO Optimization', 'Fast Loading', 'Secure Architecture'],
      icon: '🌐'
    },
    {
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android using React Native and Flutter.',
      features: ['Cross-Platform', 'Native Performance', 'App Store Deployment', 'Push Notifications'],
      icon: '📱'
    },
    {
      title: 'ERP Solutions',
      description: 'Enterprise Resource Planning systems to streamline business operations and improve efficiency.',
      features: ['Inventory Management', 'Financial Tracking', 'Customer Relations', 'Reporting & Analytics'],
      icon: '📊'
    },
    {
      title: 'E-commerce Platforms',
      description: 'Complete online store solutions with payment integration, inventory management, and order tracking.',
      features: ['Payment Gateway', 'Inventory Control', 'Order Management', 'Customer Portal'],
      icon: '🛒'
    },
    {
      title: 'Custom Software',
      description: 'Bespoke software solutions tailored to your specific business requirements and workflows.',
      features: ['Custom Logic', 'Database Design', 'API Integration', 'Scalable Architecture'],
      icon: '⚙️'
    },
    {
      title: 'Digital Marketing',
      description: 'SEO, social media marketing, and digital advertising to boost your online presence.',
      features: ['SEO Optimization', 'Social Media', 'Google Ads', 'Analytics & Reporting'],
      icon: '📈'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive digital solutions to help your business thrive 
            in the modern digital landscape. From web development to mobile apps 
            and enterprise solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-semibold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6">
            Let&apos;s discuss your project and find the perfect solution for your business needs.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us Today
          </a>
        </div>
      </div>
    </div>
  );
}