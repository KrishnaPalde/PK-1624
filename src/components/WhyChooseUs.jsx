import React from "react";
import FeatureCard from "./FeatureCard";
import ChooseCard from "./ChooseCard";

const featureData = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e9007340acce48ae46b674482d22b540ad221e76cd1b8a1a7e7533dc63187ddb?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
    title: "4500+ Destination",
    description: "Our expert team handpicked all destinations in this site."
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5ba2f342c87cfb14418911ad6c7cf0d335b58537239b1375f3791e0e60720120?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
    title: "Great 24/7 Support",
    description: "We are here to help, before, during, and even after your trip."
  }
];

const imageCardData = [
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/2aa3044f98a1bf49b0c8ce4272e0e770072e20fe51ca3f231cf28ebe732626f4?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
    title: "Fast Booking",
    description: "Secure payment"
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/f82d9ae3e29e8ac25df699fb2e1a4da7ae81ad07f8ecdcf8a030de44986dbf7a?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
    title: "Best Price",
    description: "Price match within 48 hours of order confirmation"
  }
];

function WhyChooseUs() {
  return (
    <section className="flex flex-col px-4 py-8 md:px-16 md:py-16">
      <span className="self-start px-4 py-2 text-sm font-bold text-center bg-blue-200 rounded-full">
        Why Choose Us
      </span>
      <div className="flex flex-col gap-8 mt-8 md:flex-row">
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Dare to live the life <br className="hidden md:inline" /> you've always wanted
          </h2>
          <p className="text-lg md:mt-20 text-neutral-500">
            Discover how you can offset your adventure's carbon emissions and support the sustainable initiatives practiced by our operators worldwide.
          </p>
        </div>
        <div className="w-full md:w-1/2">
  <div className="grid grid-cols-2 gap-4">
    {featureData.map((feature, index) => (
      <FeatureCard key={index} {...feature} />
    ))}
  </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {imageCardData.map((card, index) => (
              <ChooseCard key={index} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;