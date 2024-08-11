import React from "react";
import Header from "../components/Header";
import BookingForm from "../components/BookingForm";
import StayDetails from "../components/StayDetails";
import YourBookingDetailsForm from "../components/YourBookingDetailsForm";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

const YourBookingDetails = () => {
  return (
    <div className="flex flex-col max-w-full pt-12 bg-white">
      <div className="flex flex-col self-center w-full max-w-[1323px] max-md:max-w-full px-10">
        <Header />
        <main>
          <div className="mt-10">
            <BookingForm />
          </div>
          <div className="flex flex-col mt-10 md:flex-row">
            <div className="md:w-2/4">
                <YourBookingDetailsForm/>
            </div>
            <hr className="my-4"/>
            <div className="md:w-2/4">
            <StayDetails/>
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

export default YourBookingDetails;
