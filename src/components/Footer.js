import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a14] pt-20 pb-10 border-t border-white/5 font-['Inter']">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src='/images/_Logo.png' alt='Logo' className="h-10 w-auto opacity-90"/>
              <div className="leading-tight">
                <h3 className="text-xl font-bold text-white font-['Righteous']">Levroun</h3>
                <span className="text-[10px] uppercase tracking-widest text-[#1AC2FF] font-semibold">Enterprises</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Pioneering digital excellence through secure, scalable, and high-performance software solutions for the modern enterprise.
            </p>
            <div className="flex gap-4">
              {['facebook-f', 'twitter', 'linkedin-in', 'instagram'].map((social) => (
                <a key={social} href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#1AC2FF] hover:text-white transition-all">
                  <i className={`fab fa-${social} text-xs`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 font-['Righteous'] uppercase tracking-wider text-sm">Navigation</h4>
            <ul className="space-y-4 text-sm">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Services', href: '/service' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-gray-400 hover:text-[#1AC2FF] transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6 font-['Righteous'] uppercase tracking-wider text-sm">Expertise</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>Web Architecture</li>
              <li>Mobile Innovation</li>
              <li>Enterprise ERP</li>
              <li>E-Commerce Strategy</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 font-['Righteous'] uppercase tracking-wider text-sm">Connect</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3 text-gray-400">
                <i className="fas fa-envelope text-[#1AC2FF]"></i>
                <span>contact@levroun.tech</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <i className="fas fa-phone text-[#1AC2FF]"></i>
                <span>+91 8939806110</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <i className="fas fa-location-dot text-[#1AC2FF]"></i>
                <span>Global Headquaters, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
          <p>© 2025 Levroun Enterprises. Built for Excellence.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}