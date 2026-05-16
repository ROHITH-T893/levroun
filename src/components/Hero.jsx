'use client';
import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';

const SOCIAL_LINKS = [
  { icon: 'linkedin-in', link: '#', label: 'LinkedIn' },
  { icon: 'instagram',   link: '#', label: 'Instagram' },
  { icon: 'github',      link: '#', label: 'GitHub' },
];

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100svh-80px)] lg:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#06060c]" id="hero">
      {/* ── Mobile-only social icons — top right ────────────────── */}
      <div className="lg:hidden absolute top-4 right-4 flex items-center gap-3 z-20">
        {SOCIAL_LINKS.map((social, i) => (
          <a
            key={i}
            href={social.link}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1AC2FF] hover:border-[#1AC2FF] hover:text-[#06060c] hover:-translate-y-1 transition-all duration-300 shadow-md"
          >
            <i className={`fab fa-${social.icon} text-sm`}></i>
          </a>
        ))}
      </div>

      {/* ── Main Content ────────────────────────────────────────── */}
      <div className="page-x w-full relative z-10 pointer-events-none">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-20 w-full py-12 lg:py-0">

          {/* Left: Typography + CTAs */}
          <div className="w-full lg:w-3/5 pointer-events-auto space-y-8 md:space-y-12 text-left animate-entrance">
            <div className="space-y-6 md:space-y-8">
              <h1 className="text-fluid-h1 font-black leading-[0.85] text-white font-['Righteous'] tracking-tighter">
                Pioneering <br/>
                <span className="text-metallic drop-shadow-[0_0_40px_rgba(26,194,255,0.4)] block mt-4">Frontiers</span>
              </h1>
              <p className="text-fluid-p text-gray-400 max-w-xl font-['Inter'] leading-relaxed opacity-90">
                We engineer <span className="text-white font-bold">elite digital experiences</span> through secure,
                scalable, and high-performance software tailored for the modern enterprise.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-start w-full">
              <a href="/service" className="group relative w-full sm:w-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#1AC2FF] to-[#7000FF] rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative w-full px-8 md:px-10 py-4 md:py-5 bg-[#1AC2FF] rounded-2xl flex items-center justify-center sm:justify-start gap-4 transition-all hover:bg-white group-active:scale-95 shadow-[0_0_30px_rgba(26,194,255,0.4)]">
                  <span className="text-[#06060c] font-black text-sm md:text-base tracking-tighter">ENGINEER PROJECT</span>
                  <ArrowRight size={18} className="text-[#06060c] group-hover:translate-x-2 transition-transform" />
                </div>
              </a>

              <a href="/scheduling" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center sm:justify-start gap-4 backdrop-blur-xl transition-all group group-active:scale-95">
                <span className="text-white font-bold text-sm md:text-base uppercase tracking-widest opacity-80 group-hover:opacity-100">Schedule a Call</span>
                <Phone size={16} className="text-[#1AC2FF] group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Right: System Node Card — desktop only */}
          <div className="hidden lg:block w-full max-w-md group animate-entrance delay-300 relative pointer-events-auto">
            <div className="absolute -inset-10 bg-[#7000FF]/15 blur-[120px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
            <div className="glass-premium p-12 rounded-[50px] border border-white/10 space-y-10 relative z-10 shadow-2xl">
              <div className="flex justify-between items-start">
                <div className="w-20 h-20 bg-[#1AC2FF]/10 rounded-3xl flex items-center justify-center border border-[#1AC2FF]/20 group-hover:border-[#1AC2FF]/50 transition-colors">
                  <i className="fa-solid fa-microchip text-4xl text-[#1AC2FF] animate-pulse"></i>
                </div>
                <div className="flex gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-4 h-4 rounded-full bg-white/10 animate-pulse" style={{ animationDelay: `${i * 300}ms` }}></div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-3xl font-black text-white font-['Righteous'] uppercase tracking-[0.2em]">System Node</h3>
                <div className="space-y-3">
                  {[
                    { label: "Decentralized Architecture", active: true },
                    { label: "End-to-End Encryption",     active: true },
                    { label: "99.9% Logic Uptime",        active: true }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-[#1AC2FF] shadow-[0_0_8px_#1AC2FF]' : 'bg-gray-600'}`}></div>
                      <span className="text-gray-400 text-sm font-['Inter'] font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop social icons */}
              <div className="flex gap-5 pt-4">
                {SOCIAL_LINKS.map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group/icon hover:bg-[#1AC2FF] hover:border-[#1AC2FF] hover:text-[#06060c] transition-all hover:-translate-y-2 shadow-lg"
                  >
                    <i className={`fab fa-${social.icon} text-xl text-white group-hover/icon:text-[#06060c]`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Discover scroll indicator — visible on all screen sizes ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-500 pointer-events-auto z-20">
        <span className="text-[10px] uppercase tracking-[0.5em] text-white font-bold">Discover</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
