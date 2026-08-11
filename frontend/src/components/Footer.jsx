import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";


import logo from "../assets/ssd-white-logo.png";

const Footer = () => {
  const services = [
    {
      name: "Website Development",
      path: "/services/website-development",
    },
    {
      name: "Mobile App Development",
      path: "/services/mobile-app-development",
    },
    {
      name: "UI/UX Design",
      path: "/services/ui-ux-design",
    },
    {
      name: "ERP Software Solutions",
      path: "/services/erp-software-solutions",
    },
    {
      name: "SEO Optimization",
      path: "/services/seo-optimization",
    },
    {
      name: "Google Ads",
      path: "/services/google-ads",
    },
    {
      name: "Meta Ads",
      path: "/services/meta-ads",
    },
    {
      name: "Graphic Design",
      path: "/services/graphic-design",
    },
    {
      name: "Video Editing",
      path: "/services/video-editing",
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* SECTION 1 - LOGO / ABOUT */}
        <div className="footer-section footer-brand">
          <Link to="/" className="footer-logo">
            <img
              src={logo}
              alt="SSD Informatics"
              className="
    object-contain
    transition-transform
    duration-700
    ease-in-out
    hover:rotate-[360deg]
  "
            />

            <div className="footer-logo-text">
              <span className="footer-logo-title">SSD</span>
              <span className="footer-logo-subtitle">INFORMATICS</span>
            </div>
          </Link>

          <p className="footer-description">
            We provide innovative digital solutions to help businesses grow,
            connect and succeed in the digital world.
          </p>
        </div>

        {/* SECTION 2 - SERVICES */}
        <div className="footer-section">
          <h3>Services</h3>

          <ul className="footer-services">
            {services.map((service) => (
              <li key={service.path}>
                <Link to={service.path}>{service.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SECTION 3 - QUICK LINKS */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/about">About Us</Link>
            </li>

            <li>
              <Link to="/services">Services</Link>
            </li>

            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>

            <li>
              <Link to="/team">Our Team</Link>
            </li>

            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* SECTION 4 - CONTACT */}
        <div className="footer-section footer-contact">
          <h3>Contact Us</h3>

          <div className="contact-item">
            <Mail size={18} />
            <a href="mailto:info@ssdinformatics.com">info@ssdinformatics.com</a>
          </div>

          <div className="contact-item">
            <Phone size={18} />
            <a href="tel:+919876543210">+91 98765 43210</a>
          </div>

          <div className="contact-item">
            <MapPin size={18} />
            <span>Lucknow, Uttar Pradesh, India</span>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} SSD Informatics. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
