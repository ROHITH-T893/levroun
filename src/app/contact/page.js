"use client";

import { useState } from "react";


export default function ContactPage() {
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

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
      console.error('❌ Error sending email:', error);
      setSubmitStatus('error');
      alert("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-[#e2e8f0] subpage-main">
      <div className="page-x py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let&apos;s Work Together
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to start your project? Get in touch with us for a free consultation
            and let&apos;s discuss how we can help bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#0e0e1a] p-8 rounded-2xl border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-2 bg-[#16162a] border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#1AC2FF] focus:border-transparent outline-none"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-400 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-2 bg-[#16162a] border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#1AC2FF] focus:border-transparent outline-none"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 bg-[#16162a] border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#1AC2FF] focus:border-transparent outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 bg-[#16162a] border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#1AC2FF] focus:border-transparent outline-none"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-400 mb-2">
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-4 py-2 bg-[#16162a] border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#1AC2FF] focus:border-transparent outline-none"
                >
                  <option value="">Select a service</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-app">Mobile App Development</option>
                  <option value="erp-solutions">ERP Solutions</option>
                  <option value="ecommerce">E-commerce Platform</option>
                  <option value="custom-software">Custom Software</option>
                  <option value="graphic-designing">Graphic Designing</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="w-full px-4 py-2 bg-[#16162a] border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#1AC2FF] focus:border-transparent outline-none"
                  placeholder="Tell us about your project requirements..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1AC2FF] hover:bg-[#00A8E6] text-white py-3 px-6 rounded-lg font-bold transition-all transform hover:scale-[1.02]"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#1AC2FF]/10 rounded-full flex items-center justify-center text-[#1AC2FF]">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-white">Email</h3>
                    <p className="text-gray-400">contact@levroun.tech</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#1AC2FF]/10 rounded-full flex items-center justify-center text-[#1AC2FF]">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-white">Phone</h3>
                    <p className="text-gray-400">+91 8939806110</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#1AC2FF]/10 rounded-full flex items-center justify-center text-[#1AC2FF]">
                    <i className="fas fa-location-dot"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-white">Our Presence</h3>
                    <p className="text-gray-400">India | Serving clients worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1AC2FF]/10 to-transparent p-6 rounded-2xl border border-[#1AC2FF]/20">
              <h3 className="font-bold text-white mb-4">Quick Actions</h3>
              <ul className="space-y-3">
                <li><a href="/scheduling" className="text-[#1AC2FF] hover:text-white transition-colors flex items-center gap-2"><span>📅</span> Book a Strategic Call</a></li>
                <li><a href="/team" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span>👥</span> Meet Our Experts</a></li>
                <li><a href="/service" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span>🔧</span> Explore Services</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
