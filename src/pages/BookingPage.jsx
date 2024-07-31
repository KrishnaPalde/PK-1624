import React from "react";
import Header from "../components/Header";
import BookingForm from "../components/BookingForm";
import FilterSection from "../components/FilterSection";
import HotelListing from "../components/HotelListing";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

const BookingPage = () => {
  return (
    <div className="flex flex-col max-w-full pt-12 bg-white">
      <div className="flex flex-col self-center  w-full max-w-[1393px] max-md:max-w-full px-10">
        <Header />
        <main>
          <div className="mt-10">
            <BookingForm />
            <div className="flex flex-row mt-10">
              <div className="w-1/3 mt-10">
                <FilterSection />
              </div>
              <div className="w-2/3">
                <HotelListing />
              </div>
            </div>
            <div className="max-w-full mt-20">
              <NewsLetter />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
