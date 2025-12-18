import React from "react";
import { FaHandshake, FaTruck, FaLightbulb, FaHeart } from "react-icons/fa";
import { useEffect } from "react";

function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10 flex flex-col items-center">
      {/* Hero Section */}
      <div className="max-w-5xl w-full text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4">
          About CarePharma
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl">
          Delivering trust, innovation, and care across the pharmaceutical
          supply chain.
        </p>
      </div>

      {/* Mission & Values */}
      <div className="max-w-5xl w-full mb-16">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          Our Mission & Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-center">
            <FaHandshake className="text-blue-600 text-3xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Integrity
            </h3>
            <p className="text-gray-700">
              We build lasting relationships through transparency and ethical
              practices.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-center">
            <FaTruck className="text-blue-600 text-3xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Reliability
            </h3>
            <p className="text-gray-700">
              On-time delivery and consistent service are the foundation of our
              reputation.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-center">
            <FaLightbulb className="text-blue-600 text-3xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Innovation
            </h3>
            <p className="text-gray-700">
              We embrace technology to improve logistics, safety, and healthcare
              outcomes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-center">
            <FaHeart className="text-blue-600 text-3xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Compassion
            </h3>
            <p className="text-gray-700">
              We care deeply about the people behind every product and delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Our Journey */}
      <div className="max-w-5xl w-full">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          Our Journey
        </h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              2015 — Founded with Purpose
            </h3>
            <p className="text-gray-700">
              CarePharma began with a mission to streamline pharmaceutical
              distribution in underserved regions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              2018 — Expanding Our Reach
            </h3>
            <p className="text-gray-700">
              We partnered with hospitals and clinics across Europe, building a
              trusted logistics network.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              2022 — Innovating with Technology
            </h3>
            <p className="text-gray-700">
              We launched smart tracking and cold chain systems to ensure
              product safety and transparency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
