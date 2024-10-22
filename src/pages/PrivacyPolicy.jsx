import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaLock, FaUser, FaCookieBite, FaEdit, FaEnvelope } from 'react-icons/fa';
import WhatsappButton from "../components/WhatsappButton";

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <div className="container mx-[9%] px-20 py-5 my-[5%] bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Privacy Policy</h1>
        <p className="text-lg leading-8 text-gray-700 text-center mb-12">
          We value your privacy and are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your information when you interact with our website.
        </p>

        {/* Section 1: Information Collection */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
            <FaUser className="text-blue-500" /> 1. Information Collection
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We collect personal data that you provide to us directly, such as when you make a booking, subscribe to our newsletter, or contact us. The types of data we collect include your name, email address, phone number, and payment details.
          </p>
        </div>

        {/* Section 2: How We Use Your Data */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
            <FaEdit className="text-green-500" /> 2. How We Use Your Data
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            The information we collect is used to process your bookings, send confirmation emails, and improve our services. We do not share your personal data with third parties except as required for payment processing or legal compliance.
          </p>
        </div>

        {/* Section 3: Security */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
            <FaLock className="text-red-500" /> 3. Security
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, or misuse.
          </p>
        </div>

        {/* Section 4: Cookies */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
            <FaCookieBite className="text-yellow-500" /> 4. Cookies
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our website uses cookies to enhance user experience. Cookies help us understand how you use our site, so we can improve our services.
          </p>
        </div>

        {/* Section 5: Changes to This Policy */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
            <FaEdit className="text-purple-500" /> 5. Changes to This Policy
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>
        </div>

        {/* Section 6: Contact Us */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
            <FaEnvelope className="text-blue-500" /> 6. Contact Us
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:care@tranquiltrails.co.in" className="text-blue-600 underline hover:text-blue-800">care@tranquiltrails.co.in</a>.
          </p>
        </div>
      </div>
      <WhatsappButton/>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
