import '../app/globals.css'
import React from 'react'
import Image from "next/image";

const Nav = () => {
  return (
    <div className='nav'>
      <div id='logo_hold'>
        <div className="img_outer">

        <Image src="/images/_Logo.png" alt="Logo" width={45} height={40} />
        </div>
        <div className="Logo_name">
          <h1>Levroun </h1>
          <span>Enterprises</span>
        </div>
      </div>
      <div id='nav_links'>
        <ul>
          <li><a href="#hero">Home</a></li>
          <li><a href="#services_section">Services</a></li>
          <li><a href="#about_section">About Us</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>

      <div id='cta_hold'>
        <a href="https://topmate.io/levroun/?utm_source=topmate&utm_medium=popup&utm_campaign=Page_Ready" target="_blank" rel="noopener noreferrer">
          <button>
            Book a Call
          </button>
        </a>
      </div>
    </div>
  )
}

export default Nav