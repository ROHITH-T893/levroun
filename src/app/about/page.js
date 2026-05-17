import aboutData from '@/data/about.json';

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
  alternates: {
    canonical: 'https://levroun.tech/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-transparent text-[#e2e8f0] subpage-main">
      <div className="page-x py-16">
        {/* Hero Section */}
        <div className="text-center mb-20 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-['Righteous'] animate-in fade-in slide-in-from-top-4 duration-1000">
            About Levroun Enterprises
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-['Inter'] leading-relaxed">
            {aboutData.shortDescription}
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-['Righteous']">
              {aboutData.story.title}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-line">
              {aboutData.story.content}
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#1AC2FF] to-transparent rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-[#0e0e1a] rounded-3xl overflow-hidden border border-white/10">
              <img
                src="/images/about_img1.jpg"
                alt="Our Story"
                className="w-full h-[500px] object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="bg-gradient-to-br from-[#1AC2FF]/10 to-transparent p-10 rounded-3xl border border-[#1AC2FF]/20 shadow-xl">
            <div className="w-12 h-12 bg-[#1AC2FF] rounded-xl flex items-center justify-center text-[#06060c] mb-6 shadow-lg shadow-[#1AC2FF]/20">
               <i className="fas fa-rocket text-xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 font-['Righteous']">
              Our Mission
            </h3>
            <p className="text-gray-400 leading-relaxed">{aboutData.mission}</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500/10 to-transparent p-10 rounded-3xl border border-indigo-500/20 shadow-xl">
             <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/20">
               <i className="fas fa-eye text-xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 font-['Righteous']">
              Our Vision
            </h3>
            <p className="text-gray-400 leading-relaxed">{aboutData.vision}</p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 text-center font-['Righteous']">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutData.values.map((value, index) => (
              <div
                key={index}
                className="bg-[#0e0e1a] rounded-2xl border border-white/10 p-8 text-center hover:border-[#1AC2FF]/50 transition-all group"
              >
                <div className="text-4xl font-black text-[#1AC2FF]/20 group-hover:text-[#1AC2FF] transition-colors mb-4 font-['Righteous']">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights Section */}
        <div className="bg-[#1AC2FF] rounded-3xl p-16 text-[#06060c] mb-24 shadow-2xl shadow-[#1AC2FF]/20">
          <h2 className="text-3xl md:text-4xl font-black mb-16 text-center uppercase tracking-tighter">
            Why We&apos;re Different
          </h2>
          <div className="grid md:grid-cols-4 gap-12">
            {aboutData.highlights.map((highlight, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-6xl font-black">{highlight.number}</div>
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">{highlight.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-[#0e0e1a] rounded-3xl p-16 border border-white/5 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-['Righteous']">
            Ready to Build the Future?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Let&apos;s discuss your project and see how we can help transform your ideas
            into reality with elite engineering.
          </p>
          <a href="/contact">
            <button className="bg-[#1AC2FF] hover:bg-white text-[#06060c] font-black py-4 px-12 rounded-2xl transition-all shadow-xl shadow-[#1AC2FF]/20 transform hover:scale-105 active:scale-95">
              GET IN TOUCH
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
