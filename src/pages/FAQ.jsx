import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsappButton";

function FAQ() {
  // Define a list of FAQs with questions and answers
  const paymentLink = () => {
    return (
      <a href='https://razorpay.me/@tranquiltrails' target='_blank'>Payment Link</a>
    )
  }
  
  const faqs = [
    {
      question: "Where is Tranquil Trails located?",
      answer: "Tranquil Trails is located at A-610, Pacific Hills, Diversion, Mussoorie Road, Dehradun, Uttarakhand, India, Pin Code: 248009. It's nestled amidst serene surroundings, offering a peaceful getaway near Dehradun.",
    },
    {
      question: "How far is Tranquil Trails from Dehradun Airport and Railway Station?",
      answer: "• Dehradun Airport (Jolly Grant): Approximately 37 km (about 1 hour by road). • Dehradun Railway Station: Approximately 13 km (about 30 minutes by road).",
    },
    {
      question: "How can I make a booking at Tranquil Trails?",
      answer: "You can make a booking directly through our website or by contacting us via phone or email. Once your booking is confirmed, we will send you the payment details for advance payment.",
    },
    {
      question: "What is the check-in and check-out time?",
      answer: "•	Check-in: 12:00 PM •	Check-out: 11:00 AM If you need an early check-in or late check-out, please inform us in advance, and we'll do our best to accommodate your request.",
    },
    {
      question: "What are the payment options available?",
      answer: "We accept payments through Razorpay, which allows you to pay via credit/debit cards, UPI, net banking, and other online payment methods. You can complete your payment using this link: ",
    },
    {
      question: "Do you provide meals at the homestay?",
      answer: "Yes, we offer home-cooked meals that include breakfast, lunch, and dinner. You can inform us of your meal preferences in advance. Additional charges apply for meals, and vegetarian options are available.",
    },
    {
      question:"Is Wi-Fi available at the property?",
      answer:"Yes, we provide complimentary high-speed Wi-Fi for all guests during their stay.",
    },
    {
      question:"Are pets allowed at Tranquil Trails?",
      answer:"Yes, we welcome pets at Tranquil Trails with prior notice. An additional charge applies for accommodating pets to ensure proper cleaning and maintenance. Please inform us in advance if you plan to bring your pet, so we can make the necessary arrangements.",
    },
    {
      question:"What are the nearby tourist attractions?",
      answer:"Tranquil Trails is located close to popular tourist spots such as: •	Mussoorie: 35 km •	Robber’s Cave: 12 km •	Sahastradhara: 16 km •	Forest Research Institute: 10 km",
    },
    {
      question:"What if I need to cancel my booking?",
      answer:"You can cancel your booking up to 48 hours before check-in for a full refund. For cancellations within 48 hours of check-in, no refund will be provided. Please review our full cancellation policy when booking.",
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
                (faq.question === "What are the payment options available?") ? (
                  <p className="mt-4 text-gray-600">{faq.answer} 
                  <a href='https://razorpay.me/@tranquiltrails' target='_blank' className="underline text-[#255d69]">Payment Link</a>
                  </p>
                ): 
                (<p className="mt-4 text-gray-600">{faq.answer}</p>)              
              
              )}
            </div>
          ))}
        </div>
      </main>
        <br></br>
      {/* Render Footer */}
      </div>
      <WhatsAppButton/>
      <Footer />
    </div>
  );
}

export default FAQ;
