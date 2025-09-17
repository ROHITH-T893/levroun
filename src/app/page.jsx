"use client";

import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import React, { useState } from "react";
import MobileNavigation from "@/components/MobileNavigation.js";
import Footer from "@/components/Footer";
import "./globals.css";
import "../styles/MobileNavigation.css";
import "../styles/Footer.css";
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
    
    console.log("Form Data Submitted:", data);

    try {
      // Use your API route instead of direct Resend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Email sent successfully:', result);

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
    <>
    <div className="" id="container_body">
      <section className="hero" id="hero">
        <span className="mobile_nav">
          <MobileNavigation />
        </span>
        <span className="desktop_nav">
          <Nav />
        </span>
        {/* <Nav />   */}

        <div className="" id="hero_container">
          <div id="Hero_content_hold">
            <div className="hero_content">
              <h1 className="hero_title">
                We Build Secure, Scalable Digital Platforms
              </h1>

              <p className="hero_description">
                From websites to custom apps, we empower startups and businesses
                with clean code and rock-solid infrastructure.
              </p>
              <img
                src="/images/hero_bg.png"
                alt="Hero Background"
                className="mobile_hero"
              />
            </div>
            <div className="hero_btn">
              <div className="getStart">
                <h2>
                  Let’s Build <br />
                  Together
                </h2>
                <a href="#contact">
                <button>
                  <i style={{fontSize: "32px",fontWeight: "bold"}} className="fas fa-arrow-down"></i>
                </button>
                </a>
              </div>
              <div className="explore_service">
                <h2>
                  Explore Our <br />
                  Services
                </h2>
                <a href="#services_section">
                <button><i style={{fontSize: "26px"}} className="fa-solid fa-compass"></i></button>

                </a>
              </div>
            </div>
            <div className="mobile_social">
              <div id="Image_hold_social_mobile">
                <span id="span">
                  <a href="https://www.facebook.com/LevrounEnterprises" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                  </a>
                </span>
                <span id="span">
                  <a href="https://twitter.com/LevrounEnterprises" target="_blank" rel="noopener noreferrer">
                  </a>
                  <i className="fab fa-twitter"></i>
                </span>
                <span id="span">
                  <a href="https://www.linkedin.com/company/levroun-enterprises" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                  </a>
                </span>
                <span id="span">
                  <a href="https://www.instagram.com/levroun.one" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div id="image_hold">
            <img
              src="/images/hero_bg.png"
              alt="Levroun Enterprises Hero Image"
              className="img"
            />

            {/* Social Media Links */}
            <div id="Image_hold_social_desktop">
                             <span id="span">
                  <a href="https://www.facebook.com/LevrounEnterprises" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                  </a>
                </span>
                <span id="span">
                  <a href="https://twitter.com/LevrounEnterprises" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                  </a>
                </span>
                <span id="span">
                  <a href="https://www.linkedin.com/company/levroun-enterprises" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                  </a>
                </span>
                <span id="span">
                  <a href="https://www.instagram.com/levroun.one" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                  </a>
                </span>
            </div>
          </div>
        </div>

        {/* Social Media Links for Mobile */}
      </section>
      <section id="ask_section">
        <h1 id="ask_h1">Why You are here !</h1>
        <div className="circle_hold">
          <div className="circle_parent">
            <div className="card1">
              <h2>Need a Secure, Custom Website?</h2>
              <p>We build high-performance sites tailored for your business.</p>
            </div>
            <div className="card2">
              <h2>Looking to Scale Your Digital Product?</h2>
              <p>From MVP to enterprise-grade apps, we’ve got you.</p>
            </div>
            <div className="card3">
              <h2>Spending Too Much Time on Repetitive Tasks?</h2>
              <p>We automate workflows so you can focus on what matters.</p>
            </div>
            <div className="card4">
              <h2>Worried About Tech Setup or Deployment?</h2>
              <p>We handle cloud hosting, domains, email & SEO.</p>
            </div>
            <div className="circle_child_1">
              <div className="circle_child_2">
                <div className="circle_child_3">
                  <p>?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*--------------------------------- about section-------------------------------- */}
      <section id="about_section">
        <div className="about_container">
          <h1 className="about_title">Who We Are!</h1>
          <div className="about_content">
            <div className="about_img_hold">
              <img
                src="/images/about_img1.jpg"
                alt="About Image 1"
                className="about_img1"
              />
              <img
                src="/images/about_img2.jpg"
                alt="About Image 2"
                className="about_img2"
              />
            </div>
            <div className="about_content_text">
              <p className="about_text1">
                At Levroun Enterprises, we are a next-generation technology
                company driven by innovation, integrity, and impact. Founded
                with a vision to bridge the gap between complex tech and
                real-world business needs, we empower founders, startups, and
                growing ventures to thrive in the digital era. Our journey began
                with a single belief — that technology should be intuitive,
                accessible, and secure. Backed by hands-on expertise in modern
                development, cloud infrastructure, and cybersecurity, we
                approach every challenge with a solutions-first mindset and a
                commitment to long-term value.
              </p>
              <p className="about_text2">
                We don’t just build platforms —<br />
                <strong>
                  we craft experiences, simplify systems, and scale ideas.
                </strong>
              </p>
              <a href="#contact">
                <button>Start Your Journey With Us</button>
              </a>
            </div>
          </div>
          <div className="about_text2_mobile_section">
            <p className="about_text2_mobile">
              We don’t just build platforms —<br />
              <strong>
               axperiences, simplify systems, and scale ideas.
              </strong>
            </p>
            <a href="#contact">
            <button>Start Your Journey With Us</button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20" id="services_section">
        <div className="services_container">
          <div className="text-center mb-16">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: "#060134" }}
            >
              What We Offer !
            </h2>
            <p className="services_description">
              Tailored digital solutions that scale with your ambition.
            </p>
          </div>

          <div className="service_card_hold">
            <div className="service_card text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img src="/images/service-img1.png" alt="" />
              <div className="service_card_text">
                <h1>Web Development</h1>
                <p>Custom websites built with modern tech — fast, responsive, scalable, and designed to convert.</p>
              </div>
            </div>

            <div className="service_card text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img src="/images/service_img2.png" alt="" />
              <div className="service_card_text">
                <h1>App Development</h1>
                <p>Cross-platform mobile and web apps with seamless UI/UX for startups and enterprises.</p>
              </div>
            </div>

            <div className="service_card text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img src="/images/service-img3.png" alt="" />
              <div className="service_card_text">
                <h1> Graphic Designing</h1>
                <p>Posters, flyers, banners, and digital creatives that speak your brand’s visual language.</p>
              </div>
            </div>
            <div className="service_card text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img src="/images/service_img4.png" alt="" />
              <div className="service_card_text">
                <h1>E-Commerce Solutions</h1>
                <p>End-to-end online store setups with custom pricing logic, CMS, Paytm integration & more.</p>
              </div>
            </div>
            <div className="service_card text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img src="/images/service_img5.png" alt="" />
              <div className="service_card_text">
                <h1>Custom Applications</h1>
                <p>Tailor-made ERP, CRM, and internal tools that streamline your operations.</p>
              </div>
            </div>
            <div className="service_card text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img src="/images/service-img6.png" alt="" />
              <div className="service_card_text">
                <h1>SEO Optimization</h1>
                <p>Rank higher, reach faster — with performance tuning and keyword-smart site structure.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why_us_section">
        <div className="why_us_container">
          <h1>Why Choose Us?</h1>
          <p>
            We deliver quality, speed, and scalability — without breaking your
            budget.
          </p>
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
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-app">Mobile App Development</option>
                  <option value="erp-solutions">ERP Solutions</option>
                  <option value="ecommerce">E-commerce Platform</option>
                  <option value="custom-software">Custom Software</option>
                  <option value="digital-marketing"> Graphic Designing</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your project requirements, timeline, and budget..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="form_submit-btn w-full text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-blue-600 mt-1">
                    📧
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">contact@levroun.tech</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-blue-600 mt-1">
                    📱
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91 8939806110</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-blue-600 mt-1">
                    📍
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Location</h3>
                    <p className="text-gray-600">India</p>
                    <p className="text-gray-600">Serving clients worldwide</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-blue-600 mt-1">
                    ⏰
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 10:00 AM - 5:00 PM IST</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Free Consultation</h3>
              <p className="text-gray-700 mb-4">
                Get a free 30-minute consultation to discuss your project requirements 
                and receive a customized solution proposal.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  No obligation consultation
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Project timeline estimation
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Technology recommendations
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Budget-friendly solutions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>


    </div>
<Footer />
    </>
  );
}