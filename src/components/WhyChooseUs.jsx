import React from "react";
import FeatureCard from "./FeatureCard";
import ChooseCard from "./ChooseCard";

const featureData = [
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e9007340acce48ae46b674482d22b540ad221e76cd1b8a1a7e7533dc63187ddb?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
    title: "Perfect Destination to relax and enjoy",
    description: "Our expert team handpicked all destinations."
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/5ba2f342c87cfb14418911ad6c7cf0d335b58537239b1375f3791e0e60720120?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
    title: "Great Support",
    description: "We are here to help, before, during, and even after your stay."
  }
];

const imageCardData = [
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/2aa3044f98a1bf49b0c8ce4272e0e770072e20fe51ca3f231cf28ebe732626f4?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
    title: "Authentic Local Experience",
    description: "Local Culture, Flavors, and Scenic Beauty."
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/f82d9ae3e29e8ac25df699fb2e1a4da7ae81ad07f8ecdcf8a030de44986dbf7a?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
    title: "Best Price",
    description: "Value for Money"
  }
];

const textCardData = [
  {
    icon: "📍",
    title: "Exclusive Locations",
    description: "Experience handpicked stays in magical locations, thoughtfully chosen to give you privacy and serenity, far from the usual tourist trails."
  },
  {
    icon: "👥",
    title: "Personalized Hospitality",
    description: "Enjoy a warm, welcoming atmosphere where every detail is tailored to make you feel at home, whether you're relaxing or exploring."
  },
  {
    icon: "🛏️",
    title: "Unmatched Comfort",
    description: "Our spaces are designed for ultimate comfort, offering all the amenities you need for a truly restful and memorable stay."
  },
  {
    icon: "🌄",
    title: "Authentic Local Experiences",
    description: "Immerse yourself in the local culture, flavors, and scenic beauty with experiences that go beyond the typical travel itinerary."
  },
  {
    icon: "🏠",
    title: "A Home Away from Home",
    description: "Feel the warmth and familiarity of home combined with the excitement of a new destination, creating a one-of-a-kind holiday experience."
  }
];

function WhyChooseUs() {
  return (
    <section className="flex flex-col md:flex-row px-4 py-8 md:px-16 md:py-16">
      <div className="w-full md:w-1/2 space-y-8 pr-8">
        {/* Section Title */}
        <span className="px-4 py-2 text-sm font-bold text-center bg-blue-200 rounded-full">
          Why Choose Us
        </span>
        
        <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">
          Step into the life you've always imagined and make every moment unforgettable.
        </h2>
        
        {/* Text Card Section */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {textCardData.map((item, index) => (
            <div key={index} className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
              <p className="text-2xl mb-2">{item.icon}</p>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-neutral-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature and Image Cards Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 mt-8 md:mt-0">
        <div className="grid grid-cols-2 gap-4">
          {featureData.map((feature, index) => (
            <ChooseCard key={index} {...feature} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {imageCardData.map((card, index) => (
            <ChooseCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
