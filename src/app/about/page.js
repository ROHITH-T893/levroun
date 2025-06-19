

export const metadata = {
  title: 'About Us - Levroun Enterprises | Our Story & Team',
  description: 'Learn about Levroun Enterprises - a team of passionate developers building secure, scalable web and mobile applications for businesses across India.',
  keywords: 'about Levroun, company story, web development team, mobile app developers, ERP specialists, India',
  openGraph: {
    title: 'About Us - Levroun Enterprises',
    description: 'Learn about Levroun Enterprises - a team of passionate developers building secure, scalable web and mobile applications.',
    type: 'website',
    images: ['/images/og-banner.png'],
    url: 'https://levroun.tech/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Levroun Enterprises',
    description: 'Learn about Levroun Enterprises - a team of passionate developers building secure, scalable web and mobile applications.',
  },
  alternates: {
    canonical: 'https://levroun.tech/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About Levroun Enterprises
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are a team of passionate developers and designers dedicated to building 
            secure, scalable digital solutions for businesses of all sizes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded with a vision to democratize technology for businesses across India, 
              Levroun Enterprises specializes in creating custom web applications, mobile apps, 
              and enterprise resource planning (ERP) solutions.
            </p>
            <p className="text-gray-700 mb-4">
              We understand that every business is unique, which is why we take a 
              personalized approach to each project, ensuring that our solutions 
              align perfectly with your business goals and objectives.
            </p>
            <p className="text-gray-700">
              Our team combines years of experience with cutting-edge technologies 
              to deliver robust, scalable, and secure digital platforms that drive 
              business growth and efficiency.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700 mb-6">
              To empower businesses with innovative digital solutions that enhance 
              productivity, streamline operations, and drive sustainable growth.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-700">
              To be the leading technology partner for businesses seeking reliable, 
              scalable, and secure digital transformation solutions.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">Why Choose Levroun?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Team</h3>
              <p className="text-gray-700">
                Skilled developers with expertise in modern technologies and frameworks.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Custom Solutions</h3>
              <p className="text-gray-700">
                Tailored applications designed specifically for your business needs.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Ongoing Support</h3>
              <p className="text-gray-700">
                Comprehensive maintenance and support to ensure optimal performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}