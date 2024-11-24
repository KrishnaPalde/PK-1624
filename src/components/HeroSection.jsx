import React from "react";
import Header from "./Header";
import BookingForm from "./BookingForm";

function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center w-full md:mb-[10rem] max-md:max-w-full mb-10">
      <img
        loading="lazy"
        // src="https://cdn.builder.io/api/v1/image/assets/TEMP/be68dcf12afc99d7db8d02c7099aa23d28e285172409d79e5f9d7b96b2db1cfc?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
        src="https://images.unsplash.com/photo-1715827344360-65c5bb6c7b75?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
      <div className="relative flex flex-col justify-center w-full max-md:max-w-full">
        <div className="flex flex-col justify-center w-full max-md:max-w-full">
          <div className="flex flex-col items-center w-full px-4 pt-12 pb-20 mt-10 lg:mt-0 md:pt-12 max-md:px-5 max-md:max-w-full">
            <div className="flex flex-col w-full max-w-[1323px] mb-14 max-md:mb-10 max-md:max-w-full md:px-10">
              <Header />
              <div className="flex flex-col items-start w-full md:w-[630px] lg:mt-20 ml-4 text-black md:text-5xl lg:text-7xl max-md:mt-5 max-md:text-3xl">
                <h1 className="italic font-normal max-md:text-3xl">
                Your Own<br></br> Holiday Home
                </h1>
                <div className="mt-8 font-normal italic tracking-[0.05em] max-md:mt-5 max-md:text-3xl font-italianno">
                <h2>Away from Home</h2>
                </div>
                <h3 className="self-stretch mt-16 mb-10 text-xl max-md:mt-5 max-md:text-base max-md:px-2">
                  Discover an exclusive collection of extraordinary stays in enchanting locations. Escape the familiar and immerse yourself in a world of comfort, privacy, and hidden beauty.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-[1224px] z-10">
        <BookingForm />
      </div>
    </section>
  );
}

export default HeroSection;