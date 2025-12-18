import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { IoCallOutline, IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { MdOutlineMail } from 'react-icons/md';
import { FiFacebook } from 'react-icons/fi';
import { TfiTwitter } from 'react-icons/tfi';
import { FaInstagram } from 'react-icons/fa';
import { SlSocialLinkedin } from 'react-icons/sl';
import { RiSecurePaymentLine } from 'react-icons/ri';

function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionName) => {
    // Only toggle on smaller screens
    if (window.innerWidth < 1024) {
      setOpenSection(openSection === sectionName ? null : sectionName);
    }
  };

  return (
    <div>
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-11 flex flex-col items-center text-center">
        <h1 className="font-bold text-xl p-2">Stay Updated with Health Tips & Offers</h1>
        <p className="text-xs pb-6">
          Subscribe to our newsletter for the latest health insights and exclusive discounts
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter your email"
            className="placeholder:text-gray-400 rounded-lg bg-white w-full px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
          />
          <button className="rounded-lg bg-white text-blue-400 px-4 py-2 text-sm font-semibold hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-gray-900 text-gray-400">
        <div className='container mx-auto px-4  sm:px-2 lg:px-4 xl:px-0'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
            {/* Logo and Contact Info Section - Collapsible */}
            <div className="lg:block">
              <div
                className="flex items-center gap-2 mb-4 text-white cursor-pointer lg:cursor-default lg:pointer-events-none"
                onClick={() => toggleSection('logo')}
              >
                <img src={`${process.env.PUBLIC_URL}/logo.avif`} alt="CarePharma Logo" className="h-11 w-auto" />
                <h1 className="text-xl font-bold">CarePharma</h1>
                <span className="lg:hidden transition-transform duration-300 ml-auto">
                  {openSection === 'logo' ? <IoChevronUp /> : <IoChevronDown />}
                </span>
              </div>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out lg:max-h-full ${openSection === 'logo' ? 'max-h-full' : 'max-h-0'}`}>
                <p className="text-sm mb-5 leading-relaxed">
                  Your trusted online pharmacy providing authentic medicines,
                  health supplements, and medical equipment with doorstep
                  delivery. Licensed and regulated by health authorities.
                </p>
                <div className="flex items-center gap-1 pb-3">
                  <IoCallOutline className="text-blue-600" />
                  <span className="text-xs hover:text-blue-600 cursor-pointer">
                    +1-202-555-0178
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MdOutlineMail className="text-blue-600" />
                  <span className="text-xs hover:text-blue-600 cursor-pointer">
                    support@carepharma.com
                  </span>
                </div>
                <div className="flex gap-4 py-4">
                  <a href="#" aria-label="Facebook" className="hover:bg-blue-600 p-2 rounded transition-colors">
                    <FiFacebook className="text-sm" />
                  </a>
                  <a href="#" aria-label="Twitter" className="hover:bg-blue-600 p-2 rounded transition-colors">
                    <TfiTwitter className="text-sm" />
                  </a>
                  <a href="#" aria-label="Instagram" className="hover:bg-blue-600 p-2 rounded transition-colors">
                    <FaInstagram className="text-sm" />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="hover:bg-blue-600 p-2 rounded transition-colors">
                    <SlSocialLinkedin className="text-sm" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:block">
              <h1
                className="flex justify-between items-center text-xl font-bold mb-4 text-white cursor-pointer lg:cursor-default lg:pointer-events-none"
                onClick={() => toggleSection('quickLinks')}
              >
                Quick Links
                <span className="lg:hidden transition-transform duration-300">
                  {openSection === 'quickLinks' ? <IoChevronUp /> : <IoChevronDown />}
                </span>
              </h1>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out lg:max-h-full ${openSection === 'quickLinks' ? 'max-h-96' : 'max-h-0'}`}>
                <ul className="text-sm space-y-2 flex flex-col mb-4">
                  <NavLink to="/" className="hover:text-blue-600 transition-colors">About Us</NavLink>
                  <NavLink to="/" className="hover:text-blue-600 transition-colors">Contact</NavLink>
                  <NavLink to="/" className="hover:text-blue-600 transition-colors">FAQs</NavLink>
                  <NavLink to="/" className="hover:text-blue-600 transition-colors">Shipping Info</NavLink>
                  <NavLink to="/" className="hover:text-blue-600 transition-colors">Returns</NavLink>
                  <NavLink to="/" className="hover:text-blue-600 transition-colors">Careers</NavLink>
                </ul>
              </div>
            </div>

            {/* Categories */}
            <div className="lg:block">
              <h1
                className="flex justify-between items-center text-xl font-bold mb-4 text-white cursor-pointer lg:cursor-default lg:pointer-events-none"
                onClick={() => toggleSection('categories')}
              >
                Categories
                <span className="lg:hidden transition-transform duration-300">
                  {openSection === 'categories' ? <IoChevronUp /> : <IoChevronDown />}
                </span>
              </h1>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out lg:max-h-full ${openSection === 'categories' ? 'max-h-96' : 'max-h-0'}`}>
                <ul className="text-sm space-y-2 flex flex-col mb-4">
                  <NavLink to="/products" className="hover:text-blue-600 transition-colors">Medicines</NavLink>
                  <NavLink to="/products" className="hover:text-blue-600 transition-colors">Vitamins</NavLink>
                  <NavLink to="/products" className="hover:text-blue-600 transition-colors">Medical Equipment</NavLink>
                  <NavLink to="/products" className="hover:text-blue-600 transition-colors">First Aid</NavLink>
                  <NavLink to="/products" className="hover:text-blue-600 transition-colors">Personal Care</NavLink>
                  <NavLink to="/products" className="hover:text-blue-600 transition-colors">Baby Care</NavLink>
                </ul>
              </div>
            </div>

            {/* Legal */}
            <div className="lg:block">
              <h1
                className="flex justify-between items-center text-xl font-bold mb-4 text-white cursor-pointer lg:cursor-default lg:pointer-events-none"
                onClick={() => toggleSection('legal')}
              >
                Legal
                <span className="lg:hidden transition-transform duration-300">
                  {openSection === 'legal' ? <IoChevronUp /> : <IoChevronDown />}
                </span>
              </h1>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out lg:max-h-full ${openSection === 'legal' ? 'max-h-96' : 'max-h-0'}`}>
                <ul className="text-sm space-y-2 flex flex-col mb-4">
                  <NavLink to="/" className="hover:text-blue-600 transition-colors">Privacy Policy</NavLink>
                  <NavLink to="/" className="hover:text-blue-600 transition-colors">Terms of Service</NavLink>
                  <NavLink to="/" className="hover:text-blue-600 transition-colors">Prescription Policy</NavLink>
                  <NavLink to="/" className="hover:text-blue-600 transition-colors">Refund Policy</NavLink>
                  <NavLink to="/" className="hover:text-blue-600 transition-colors">Cookie Policy</NavLink>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700" />

        {/* Bottom Section */}
        <div className='container mx-auto px-4  sm:px-2 lg:px-4 xl:px-0'>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-6 py-5">
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
              <div className="flex gap-2 items-center">
                <RiSecurePaymentLine className="text-green-300 text-xl" />
                <span className="text-xs">FDA Approved</span>
              </div>
              <div className="flex gap-2 items-center">
                <RiSecurePaymentLine className="text-blue-300 text-xl" />
                <span className="text-xs">SSL Secured</span>
              </div>
              <div className="flex gap-2 items-center">
                <RiSecurePaymentLine className="text-purple-300 text-xl" />
                <span className="text-xs">HIPAA Compliant</span>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <span className="text-xs">
                License No: CP-2024-001234 | Registered Pharmacy
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700" />
        <div>
          <div className="flex justify-center py-2 text-center">
            <span className="text-xs ">© Rayan Trad & Sujoud Jamile CarePharma 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;