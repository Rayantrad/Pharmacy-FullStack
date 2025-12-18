import React from 'react';
import { FaTruck, FaHeartbeat, FaShieldAlt, FaSnowflake } from 'react-icons/fa';
import { useEffect } from 'react';

function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: 'Pharmaceutical Distribution',
      description: 'We deliver high-quality medications and healthcare products to pharmacies and hospitals across the region.',
      icon: <FaTruck className="text-blue-600 text-4xl mb-4" />,
    },
    {
      title: 'Medical Equipment Supply',
      description: 'From diagnostic tools to surgical instruments, we provide reliable medical equipment for every need.',
      icon: <FaHeartbeat className="text-blue-600 text-4xl mb-4" />,
    },
    {
      title: 'Consulting & Compliance',
      description: 'Our experts help you navigate regulatory standards and optimize your pharmaceutical operations.',
      icon: <FaShieldAlt className="text-blue-600 text-4xl mb-4" />,
    },
    {
      title: 'Cold Chain Logistics',
      description: 'We ensure temperature-sensitive products are stored and transported safely and efficiently.',
      icon: <FaSnowflake className="text-blue-600 text-4xl mb-4" />,
    },
  ];

  const features = [
    'ISO-certified logistics and handling',
    '24/7 customer support and tracking',
    'Trusted by 100+ healthcare institutions',
    'Eco-friendly packaging and delivery',
  ];

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10 flex flex-col items-center">
      {/* Hero Section */}
      <div className="max-w-5xl w-full text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4">CarePharma Services</h1>
        <p className="text-gray-700 text-lg sm:text-xl">
          Empowering healthcare through reliable distribution, expert consulting, and cutting-edge logistics.
        </p>
      </div>

      {/* Features Section */}
      <div className="max-w-4xl w-full mb-12">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">Why Choose Us</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-base list-disc list-inside">
          {features.map((feature, index) => (
            <li key={index} className="bg-white p-4 rounded shadow hover:shadow-md transition">{feature}</li>
          ))}
        </ul>
      </div>

      {/* Services Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        {services.map((service, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition transform hover:-translate-y-1">
            {service.icon}
            <h3 className="text-xl font-semibold text-blue-700 mb-2">{service.title}</h3>
            <p className="text-gray-700">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;