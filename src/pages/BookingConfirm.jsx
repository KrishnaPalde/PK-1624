import React from "react";
import BookingConfirmTitle from "../components/BookingConfirmTitle";
import BookingConfirmationCard from "../components/BookingConfirmationCard";
import TermsAndConditions from "../components/TermsAndConditions";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import Header from "../components/Header";

const BookingConfirm = () => {
  return (
    <div className="flex flex-col pt-12 bg-white">
      <div className="flex flex-col self-center px-10 w-full max-w-[1323px] max-md:max-w-full">
        <Header />
        <main>
            <div>
                <BookingConfirmTitle/>
                <div className="mt-10">
                    <BookingConfirmationCard/>
                </div>
                <div className="mt-10">
                    <TermsAndConditions/>
                </div>
            </div>
            <div className="mt-10">
                <NewsLetter/>
            </div>
        </main>
      </div>
      <Footer/>
    </div>
  );
};

export default BookingConfirm;
