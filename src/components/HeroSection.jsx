import React from "react";
import Header from "./Header";
import BookingForm from "./BookingForm";

function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center w-full md:mb-[10rem] max-md:max-w-full mb-10">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/be68dcf12afc99d7db8d02c7099aa23d28e285172409d79e5f9d7b96b2db1cfc?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
        alt=""
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
      <div className="relative flex flex-col justify-center w-full max-md:max-w-full">
        <div className="flex flex-col justify-center w-full max-md:max-w-full">
          <div className="flex flex-col items-center w-full px-4 pt-12 pb-20 md:pt-12 max-md:px-5 max-md:max-w-full">
            <div className="flex flex-col w-full max-w-[1323px] mb-14 max-md:mb-10 max-md:max-w-full md:px-10">
              <Header />
              <div className="flex flex-col items-start w-full md:w-[630px] mt-20 ml-4 text-black text-7xl max-md:mt-5 max-md:text-3xl">
                <h1 className="italic font-normal max-md:text-3xl">
                  Stay that are
                </h1>
                <div className="mt-8 font-normal italic tracking-[0.05em] max-md:mt-5 max-md:text-3xl font-italianno">
                  Experience
                </div>
                <p className="self-stretch mt-16 mb-10 text-xl max-md:mt-5 max-md:text-base max-md:px-2">
                  Our exclusive collection of extra-ordinary stays at magical
                  locations that are hidden from plain sight.
                </p>
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