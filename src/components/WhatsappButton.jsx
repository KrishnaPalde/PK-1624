import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon from react-icons

const WhatsAppButton = () => {
  const whatsappNumber = "7673992288"; // Replace with your client's WhatsApp number

  return (
    <div className="fixed bottom-4 right-4">
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp size={32} /> {/* Increased icon size */}
      </a>
    </div>
  );
};

export default WhatsAppButton;
