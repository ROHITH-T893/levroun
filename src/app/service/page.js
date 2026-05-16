import staticServicesData from '@/data/services.json';

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
  alternates: {
    canonical: 'https://levroun.tech/service',
  },
};

export default function ServicesPage() {
  const services = staticServicesData;

  return (
    <div className="min-h-screen bg-transparent text-[#e2e8f0] subpage-main">
      <div className="page-x py-16">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-['Righteous']">
            Our Services
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-['Inter']">
            Comprehensive digital solutions tailored to your business needs.
            From concept to deployment, we&apos;ve got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service._id || service.title}
              className="bg-[#0e0e1a] rounded-2xl border border-white/10 overflow-hidden hover:border-[#1AC2FF]/50 transition-all duration-300 p-8 flex flex-col group"
            >
              <div className="mb-6 w-16 h-16 bg-[#1AC2FF]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <img
                  src={service.icon || '/images/icons/default.png'}
                  alt={service.title}
                  className="h-10 w-10 object-contain"
                />
              </div>

              <h2 className="text-2xl font-bold text-white mb-4 font-['Righteous']">
                {service.title}
              </h2>

              <p className="text-gray-400 mb-6 flex-grow leading-relaxed">
                {service.description}
              </p>

              <div className="mb-6">
                <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3 font-mono">
                  Capabilities:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(service.technologies || service.features || ['Custom Solution']).map((tech, index) => (
                    <span
                      key={index}
                      className="bg-white/5 border border-white/10 text-[#1AC2FF]/80 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="font-black text-[#1AC2FF] text-lg mb-4">
                  {service.price}
                </p>
                <a href="/contact">
                  <button className="w-full bg-[#1AC2FF] hover:bg-white hover:text-[#06060c] text-[#06060c] font-black py-3 px-4 rounded-xl transition-all uppercase text-xs tracking-widest">
                    GET QUOTE
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-br from-[#1AC2FF]/10 to-transparent rounded-3xl p-12 text-center border border-[#1AC2FF]/20">
          <h2 className="text-3xl font-bold text-white mb-4 font-['Righteous']">
            Tailored Solutions for Your Vision
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            We offer customized architectures tailored to your specific ecosystem.
            Let&apos;s architect your next-gen platform together.
          </p>
          <a href="/contact">
            <button className="bg-white text-[#06060c] hover:bg-[#1AC2FF] hover:text-white font-black py-4 px-10 rounded-2xl transition-all shadow-lg uppercase tracking-widest">
              START YOUR PROJECT
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
