import React, { useState } from "react";
import Header from "../components/Header";
import BookingForm from "../components/BookingForm";
import FilterSection from "../components/FilterSection";
import HotelListing from "../components/HotelListing";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsappButton";

const BookingPage = () => {
  const [priceRange, setPriceRange] = useState([50, 100000]);
  const [selectedRating, setSelectedRating] = useState(0);

  return (
    <div className="flex flex-col max-w-full pt-12 bg-white">
      <div className="flex flex-col self-center  w-full max-w-[1323px] max-md:max-w-full px-10">
        <Header />
        <main>
          <div className="mt-10">
            <BookingForm />
            <div className="flex flex-col mt-10 md:flex-row">
              <div className="w-full mt-10 md:w-1/3">
                <FilterSection
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedRating={selectedRating}
                  setSelectedRating={setSelectedRating}
                />
              </div>
              <div className="md:w-2/3">
                <HotelListing
                  priceRange={priceRange}
                  selectedRating={selectedRating}
                />
              </div>
            </div>
            <div className="max-w-full mt-20">
              <NewsLetter />
            </div>
          </div>
        </main>
      </div>
      <WhatsAppButton/>
      <Footer />
    </div>
  );
};

export default BookingPage;
