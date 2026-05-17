import '../app/globals.css'
import React from 'react'
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className='fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl animate-in fade-in slide-in-from-top-4 duration-1000 hidden lg:block'>
      <div className='glass rounded-2xl px-6 py-3 flex justify-between items-center shadow-2xl'>
        <div id='logo_hold'>
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-white/10 p-1.5 rounded-xl transition-all group-hover:scale-110 group-hover:bg-white/20">
              <Image src="/images/_Logo.png" alt="Logo" width={32} height={32} className="object-contain" />
            </div>
            <div className="Logo_name flex flex-col leading-tight">
              <h1 className="text-xl font-bold text-white tracking-tight font-['Righteous']">Levroun</h1>
              <span className="text-[10px] uppercase tracking-widest text-[#1AC2FF] font-semibold">Enterprises</span>
            </div>
          </Link>
        </div>

        <div id='nav_links' className="hidden md:block">
          <ul className="flex gap-8">
            <li><Link href="/" className="text-sm font-medium text-gray-300 hover:text-[#1AC2FF] transition-colors">Home</Link></li>
            <li><Link href="/team" className="text-sm font-medium text-gray-300 hover:text-[#1AC2FF] transition-colors">Team</Link></li>
            <li><Link href="/service" className="text-sm font-medium text-gray-300 hover:text-[#1AC2FF] transition-colors">Services</Link></li>
            <li><Link href="/about" className="text-sm font-medium text-gray-300 hover:text-[#1AC2FF] transition-colors">About</Link></li>
            <li><Link href="/contact" className="text-sm font-medium text-gray-300 hover:text-[#1AC2FF] transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div id='cta_hold'>
          <Link href="/contact">
            <button className="bg-[#1AC2FF] hover:bg-white hover:text-[#06060c] text-[#06060c] px-6 py-2 rounded-xl text-sm font-bold transition-all transform hover:scale-105 shadow-lg shadow-[#1AC2FF]/20">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav