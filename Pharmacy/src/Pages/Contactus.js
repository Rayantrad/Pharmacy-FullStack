import React from 'react';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useEffect } from 'react';

function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10 flex flex-col items-center">
      {/* Hero Title Section */}
      <div className="max-w-5xl w-full text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4">Contact CarePharma</h1>
        <p className="text-gray-700 text-lg sm:text-xl">
          We're here to help. Reach out with any questions, feedback, or partnership inquiries.
        </p>
      </div>

      {/* Contact Form and Info */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-2 text-center">Get in Touch</h2>
        <p className="text-center text-gray-600 mb-6">Feel free to drop us a line below!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your name"
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Your email"
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              rows="5"
              placeholder="Type your message here..."
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
            >
              SEND
            </button>
          </form>

          {/* Contact Info */}
          <div className="bg-blue-800 text-white p-6 rounded-lg flex flex-col justify-between">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="mb-2">📍 23, Avenue de Paris<br />75012 Paris</p>
            <p className="mb-2">✉️ CarePharma@gmail.cm</p>
            <p className="mb-2">💬 CarePharma.com</p>
            <p className="mb-2">📞 +33 6 15 93 01 44</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-blue-300"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-blue-300"><FaTwitter size={20} /></a>
              <a href="#" className="hover:text-blue-300"><FaLinkedin size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;