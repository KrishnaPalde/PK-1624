import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function FAQ() {
  // Define a list of FAQs with questions and answers
  const faqs = [
    {
      question: "How can I book a property?",
      answer: "To book a property, simply search for the desired location and dates, select a property, and follow the booking instructions on our platform. You can also contact our support team for assistance.",
    },
    {
      question: "What is the cancellation policy?",
      answer: "The cancellation policy varies depending on the property. Please refer to the specific property's terms and conditions for more details. Generally, you can cancel within 24 hours of booking for a full refund.",
    },
    {
      question: "Are pets allowed in the property?",
      answer: "Pet policies vary by property. Please check the property details page for specific rules regarding pets. Some properties allow pets with prior approval, while others may have restrictions.",
    },
    {
      question: "How do I check in to the property?",
      answer: "After booking, you will receive detailed check-in instructions via email. This typically includes the property's address, check-in time, and any access codes or keys required.",
    },
    {
      question: "Can I request an early check-in or late check-out?",
      answer: "Early check-in and late check-out requests are subject to availability. Please contact the property owner or manager directly to make arrangements.",
    },
  ];

  // State to track which FAQ is currently expanded
  const [expanded, setExpanded] = useState(null);

  // Toggle the expanded state for a given FAQ
  const toggleFAQ = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="flex flex-col max-w-full pt-12 bg-white">
      <div className="flex flex-col self-center  w-full max-w-[1323px] max-md:max-w-full px-10">
      <Header />

      {/* FAQ Section */}
      <main className="flex-grow px-5 py-10 md:px-20 lg:px-40">
        <h1 className="mb-10 text-3xl font-bold text-center text-gray-800">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
            >
              <button
                className="flex items-center justify-between w-full text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-gray-800">
                  {faq.question}
                </span>
                <span className="text-gray-500">
                  {expanded === index ? "-" : "+"}
                </span>
              </button>
              {expanded === index && (
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </main>
        <br></br>
      {/* Render Footer */}
      </div>
      <Footer />
    </div>
  );
}

export default FAQ;
