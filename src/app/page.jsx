"use client";

import React, { useState } from "react";
<<<<<<< HEAD
import Hero from "@/components/Hero";
import AnimatedSection from "@/components/AnimatedSection";

=======
import MobileNavigation from "@/components/MobileNavigation.js";
import Footer from "@/components/Footer";
import DynamicServices from "@/components/DynamicServices";
import "./globals.css";
import "../styles/MobileNavigation.css";
import "../styles/Footer.css";
>>>>>>> 6ebd911105ff42deb347ebaae1bc903d779cbc32
export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    const formData = new FormData(e.target);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        alert("Thank you for contacting us! We will get back to you soon.");
        e.target.reset();
      } else {
        setSubmitStatus('error');
        alert("There was an error sending your message. Please try again.");
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      alert("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#06060c] text-[#e2e8f0]" id="container_body">
      <Hero />

      {/* Why You are here Section */}
      <AnimatedSection className="section-padding">
        <div className="page-x">
          <h2 className="text-fluid-h2 text-center mb-12 md:mb-20 font-['Righteous'] text-white">
            Why are you <span className="text-metallic">here?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Secure & Custom", desc: "We build high-performance sites tailored for your business.", icon: "fa-shield-halved" },
              { title: "Scaleable Products", desc: "From MVP to enterprise-grade apps, we've got you covered.", icon: "fa-layer-group" },
              { title: "Workflow Automation", desc: "We automate repetitive tasks so you can focus on growth.", icon: "fa-gears" },
              { title: "Seamless Deployment", desc: "We handle cloud, domains, email & SEO optimization.", icon: "fa-cloud-arrow-up" }
            ].map((card, i) => (
              <div key={i} className="glass-premium p-8 rounded-[40px] border border-white/5 hover:border-[#1AC2FF]/40 transition-all group relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#1AC2FF]/5 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#1AC2FF]/10"></div>
                <div className="w-14 h-14 bg-[#1AC2FF]/10 rounded-2xl flex items-center justify-center text-[#1AC2FF] mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform shadow-inner shadow-white/5">
                  <i className={`fas ${card.icon} text-2xl`}></i>
                </div>
                <h3 className="text-xl font-black text-white mb-3 tracking-tight">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* About / Who We Are Section */}
      <AnimatedSection id="about_section" className="section-padding border-y border-white/5">
        <div className="page-x">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#1AC2FF] to-[#7000FF] rounded-[50px] blur-3xl opacity-10 transition-opacity group-hover:opacity-30"></div>
              <div className="relative aspect-video lg:h-[480px] w-full overflow-hidden rounded-[40px] border border-white/10 shadow-2xl">
                <img
                  src="/images/about_img1.jpg"
                  alt="About Levroun Enterprises"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06060c] via-transparent to-transparent opacity-60"></div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <h2 className="text-fluid-h2 font-black text-white font-['Righteous'] uppercase tracking-tight leading-none">Who We <span className="text-metallic">Are</span></h2>
                <div className="w-20 h-1.5 bg-[#1AC2FF] rounded-full"></div>
              </div>
              <p className="text-fluid-p text-gray-400 leading-relaxed font-['Inter'] opacity-90">
                At Levroun Enterprises, we are a next-generation technology company driven by innovation and impact.
                We bridge the gap between complex tech and real-world business needs, empowering founders to thrive in the digital era.
              </p>
              <div className="p-8 glass-premium border-l-8 border-[#1AC2FF] rounded-r-[30px] shadow-lg">
                <p className="text-white font-black italic text-lg md:text-2xl leading-tight">"We don't just build platforms — we craft experiences, simplify systems, and scale ideas."</p>
              </div>
              <a href="/about" className="inline-block w-full sm:w-auto">
                <button className="w-full sm:w-auto group relative">
                  <div className="absolute -inset-1 bg-white rounded-xl blur opacity-10 group-hover:opacity-30 transition"></div>
                  <div className="relative bg-white text-[#06060c] px-8 py-4 rounded-xl font-black transition-all hover:bg-[#1AC2FF] hover:text-white uppercase tracking-[0.15em] text-sm">
                    DISCOVER OUR JOURNEY
                  </div>
                </button>
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>

<<<<<<< HEAD
      {/* Bento Services Section */}
      <AnimatedSection className="section-padding" id="services_section">
        <div className="page-x">
          <div className="text-center mb-12 md:mb-20 space-y-4">
            <h2 className="text-fluid-h2 text-white font-['Righteous'] uppercase tracking-tight">Expertise <span className="text-metallic">& Solutions</span></h2>
            <p className="text-fluid-p text-gray-400 max-w-2xl mx-auto opacity-70">
              Tailored digital ecosystems engineered for exponential growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-auto md:auto-rows-[340px]">
            {[
              { title: "Web Architecture", img: "/images/service-img1.png", desc: "Custom reactive websites built with modern high-performance frameworks.", span: "lg:col-span-8 md:col-span-3" },
              { title: "Mobile Ecosystems", img: "/images/service_img2.png", desc: "Elite UI/UX for cross-platform apps.", span: "lg:col-span-4 md:col-span-3" },
              { title: "E-Commerce", img: "/images/service_img4.png", desc: "Global retail scalability.", span: "lg:col-span-4 md:col-span-3" },
              { title: "Custom ERP", img: "/images/service_img5.png", desc: "Internal automation engines.", span: "lg:col-span-8 md:col-span-3" }
            ].map((service, i) => (
              <div key={i} className={`${service.span} glass-premium rounded-[40px] p-8 md:p-10 flex flex-col justify-between group overflow-hidden relative min-h-[260px] md:min-h-0`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#1AC2FF]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#1AC2FF]/10 transition-colors"></div>
                <div className="relative z-10">
                  <img src={service.img} alt={service.title} className="w-14 h-14 mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-2xl font-black text-white mb-3 font-['Righteous'] tracking-tight">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-md opacity-80">{service.desc}</p>
=======
      <DynamicServices />

      <section id="why_us_section">
        <div className="why_us_container">
          <h1>Why Choose Us?</h1>
          <h6>
            We deliver quality, speed, and scalability — without breaking your
            budget.
          </h6>
          <div className="why_us_card_hold">
            <div className="why_us_card">
              <img src="/images/whyUs_img1.png" alt="" />
              <div className="whyUs_card-text">
                <h1>Affordable Pricing</h1>
                <p>Get premium solutions without burning your budget — transparent, scalable pricing for startups and enterprises alike.</p> 
              </div>
            </div>
            <div className="why_us_card">
              <img src="/images/whyUs_img2.png" alt="" />
              <div className="whyUs_card-text">
                <h1> Full Ownership</h1>
                <p>You own 100% of your code, designs, and assets — no lock-ins, no hidden conditions.</p>
              </div>
            </div>
            <div className="why_us_card">
              <img src="/images/whyUs_img3.png" alt="" />
              <div className="whyUs_card-text">
                <h1>Built Secure</h1>
                <p>Every project is crafted with a security-first mindset — from infrastructure to code, your data stays protected.</p>
              </div>
            </div>
            <div className="why_us_card">
              <img src="/images/whyUs_img4.png" alt="" />
              <div className="whyUs_card-text">
                <h1>Fast Delivery</h1>
                <p>Agile processes, clear communication, and tight turnarounds mean your product ships on time — every time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


{/* contact section */}
<section id="contact">
  <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="about_title text-lg sm:text-5xl font-bold mb-6">
           Let's Work Together
          </h1>
          <p className="about_description text-sm sm:text-md text-primary max-w-3xl mx-auto">
            Ready to start your project? Get in touch with us for a free consultation
            and let&apos;s discuss how we can help bring your ideas to life.
          </p>
        </div>

        <div className="contact_container grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className=" bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your first name"
                  />
>>>>>>> 6ebd911105ff42deb347ebaae1bc903d779cbc32
                </div>
                <div className="mt-6 flex items-center gap-3 text-[#1AC2FF] font-black uppercase tracking-widest text-xs group-hover:gap-5 transition-all cursor-pointer">
                  <span>View Solution</span>
                  <i className="fa-solid fa-arrow-right-long text-base"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Why Us Section */}
      <AnimatedSection id="why_us_section" className="section-padding">
        <div className="page-x">
          <div className="text-center space-y-4 mb-12 md:mb-20">
            <h2 className="text-fluid-h2 text-white font-['Righteous'] uppercase tracking-tight leading-none">Why Choose <span className="text-metallic">Levroun</span></h2>
            <p className="text-fluid-p text-gray-400 max-w-2xl mx-auto opacity-70">Elite engineering, agile delivery, and absolute transparency.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: "Affordable", img: "/images/whyUs_img1.png", desc: "Premium solutions without the premium price tag." },
              { title: "100% Ownership", img: "/images/whyUs_img2.png", desc: "You own every single line of code and asset." },
              { title: "Built Secure", img: "/images/whyUs_img3.png", desc: "Security-first architecture for ultimate protection." },
              { title: "Fast Shipping", img: "/images/whyUs_img4.png", desc: "Agile sprints ensuring you launch ahead of time." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-6 p-8 rounded-[40px] glass-premium group">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center p-3 group-hover:bg-[#1AC2FF]/10 group-hover:scale-110 transition-all duration-500">
                  <img src={item.img} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Home Contact Section */}
      <AnimatedSection id="contact" className="section-padding border-t border-white/5">
        <div className="page-x">
          <div className="text-center mb-12 md:mb-20 space-y-4">
            <h2 className="text-fluid-h2 text-white font-['Righteous'] uppercase leading-none">Get in <span className="text-metallic">Touch</span></h2>
            <p className="text-fluid-p text-gray-400 max-w-2xl mx-auto opacity-70">
              Ready to architect your next digital leap?
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
            <div className="bg-[#0e0e1a] p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-8">Send us a Message</h3>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#1AC2FF] uppercase tracking-widest">First Name</label>
                    <input name="firstName" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1AC2FF] transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#1AC2FF] uppercase tracking-widest">Last Name</label>
                    <input name="lastName" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1AC2FF] transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#1AC2FF] uppercase tracking-widest">Email Address</label>
                  <input name="email" type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1AC2FF] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#1AC2FF] uppercase tracking-widest">Project Details</label>
                  <textarea name="message" rows="4" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1AC2FF] transition-colors"></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#1AC2FF] text-[#06060c] font-black py-4 rounded-xl transition-all hover:bg-white active:scale-95">
                  {isSubmitting ? 'ENGINEERING YOUR MESSAGE...' : 'SEND PROJECT INQUIRY'}
                </button>
              </form>
            </div>

            <div className="space-y-10">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Direct Connect</h3>
                <div className="space-y-5">
                  <div className="flex items-center gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-[#1AC2FF]/10 flex items-center justify-center text-[#1AC2FF] group-hover:bg-[#1AC2FF] group-hover:text-white transition-all flex-shrink-0">
                      <i className="fas fa-envelope text-xl"></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Email Us</p>
                      <p className="text-white font-bold">contact@levroun.tech</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all flex-shrink-0">
                      <i className="fas fa-phone text-xl"></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Call Support</p>
                      <p className="text-white font-bold">+91 8939806110</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-[#1AC2FF]/20 to-transparent rounded-3xl border border-[#1AC2FF]/20">
                <h4 className="text-white font-bold mb-3">Strategic Partnership?</h4>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">We are always looking for high-value collaborations and talent. If you have a vision, we have the engineering power.</p>
                <a href="https://topmate.io/levroun/" target="_blank" className="text-[#1AC2FF] font-black uppercase text-sm flex items-center gap-2 hover:gap-4 transition-all">
                  BOOK A STRATEGIC CALL <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
