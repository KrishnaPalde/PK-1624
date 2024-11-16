import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaMoneyBillWave, FaBan, FaClock, FaUsers, FaEdit, FaEnvelope } from 'react-icons/fa';
import WhatsAppButton from '../components/WhatsappButton';

const TermsAndConditions = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-8 mt-24 mb-24 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-8">
          Terms & Conditions
        </h1>
        <p className="text-sm sm:text-base md:text-lg leading-6 md:leading-8 text-gray-700 text-center mb-8 md:mb-12">
          These terms and conditions outline the rules and regulations for the use of our website and services.
        </p>

        {/* Section 1: Bookings & Payments */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-3">
            <FaMoneyBillWave className="text-green-500" /> 1. Bookings & Payments
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-600">
            Full payment must be made at the time of booking. We accept online payments through our secure payment gateway. Bookings will not be confirmed until the payment is successfully processed.
          </p>
        </div>

        {/* Section 2: Cancellation & Refund Policy */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-3">
            <FaBan className="text-red-500" /> 2. Cancellation & Refund Policy
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-600">
            Cancellations made up to 48 hours before the check-in date will be eligible for a full refund. Cancellations made within 48 hours of the check-in date will incur a penalty fee. No-shows will not be refunded.
          </p>
        </div>

        {/* Section 3: Check-In & Check-Out */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-3">
            <FaClock className="text-blue-500" /> 3. Check-In & Check-Out
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-600">
            Guests are requested to check in between 2 pm and 8 pm on the day of arrival. Check-out to be completed by 11 am on the departure date. If you require an early check-in or late check-out, please let us know in advance, as additional fees may apply.
          </p>
        </div>

        {/* Section 4: Guest Responsibilities */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-3">
            <FaUsers className="text-yellow-500" /> 4. Guest Responsibilities
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-600">
            Guests are responsible for keeping the property in good condition. Any damage caused by guests during their stay will result in additional charges.
          </p>
        </div>

        {/* Section 5: Changes to These Terms */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-3">
            <FaEdit className="text-purple-500" /> 5. Changes to These Terms
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-600">
            We reserve the right to modify these terms at any time. Any changes will be posted on this page with an updated revision date.
          </p>
        </div>

        {/* Section 6: Contact Us */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-3">
            <FaEnvelope className="text-blue-500" /> 6. Contact Us
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-600">
            If you have any questions about these terms and conditions, please contact us at{' '}
            <a
              href="mailto:care@tranquiltrails.co.in"
              className="text-blue-600 underline hover:text-blue-800"
            >
              care@tranquiltrails.co.in
            </a>
            .
          </p>
        </div>
      </div>
      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default TermsAndConditions;
