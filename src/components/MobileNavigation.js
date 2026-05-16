'use client';
import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const toggleNav = () => setIsOpen(!isOpen);
  const closeNav = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <nav className="fixed top-0 left-0 w-full z-[60] md:hidden px-4 py-4 backdrop-blur-md bg-black/20 border-b border-white/5">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2" onClick={closeNav}>
            <Image src="/images/_Logo.png" alt="Logo" width={28} height={28} />
            <span className="text-white font-['Righteous'] text-lg">Levroun</span>
          </Link>
          
          <button 
            onClick={toggleNav}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Menu Overlay */}
      <div className={`fixed inset-0 z-[70] transition-all duration-500 ease-in-out md:hidden ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[#06060c]/90 backdrop-blur-xl" onClick={closeNav}></div>
        
        {/* Full Screen Menu */}
        <div className={`relative h-full w-full flex flex-col justify-center items-center p-8 transition-transform duration-500 ${isOpen ? 'scale-100' : 'scale-95'}`}>
          <ul className="flex flex-col items-center gap-8 text-center">
            {['Home', 'Team', 'Services', 'About', 'Contact'].map((item, i) => (
              <li 
                key={item}
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              >
      <Link 
        href={item === 'Home' ? '/' : `/${item.toLowerCase() === 'services' ? 'service' : item.toLowerCase()}`}
        onClick={closeNav}
        className="text-3xl font-bold text-white hover:text-[#1AC2FF] transition-colors font-['Righteous']"
      >
        {item === 'Service' ? 'Services' : item}
      </Link>
              </li>
            ))}
          </ul>

          <div className={`mt-12 transition-all duration-500 delay-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <Link href="/contact" onClick={closeNav}>
              <button className="bg-[#1AC2FF] text-[#06060c] px-8 py-4 rounded-2xl font-black text-xl shadow-lg shadow-[#1AC2FF]/30 active:scale-95 transition-transform">
                GET STARTED
              </button>
            </Link>
          </div>

          <div className={`mt-auto flex gap-6 pb-8 transition-all duration-500 delay-700 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {['facebook-f', 'twitter', 'linkedin-in', 'instagram'].map((social) => (
              <a key={social} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400">
                <i className={`fab fa-${social} text-xl`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}