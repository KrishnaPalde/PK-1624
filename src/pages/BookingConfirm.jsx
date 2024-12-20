import React, { useState } from "react";
import BookingConfirmTitle from "../components/BookingConfirmTitle";
import BookingConfirmationCard from "../components/BookingConfirmationCard";
import TermsAndConditions from "../components/TermsAndConditions";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate, useLocation,useParams } from "react-router-dom";
import axios from "axios";
import WhatsAppButton from "../components/WhatsappButton";

const BookingConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roomData = location.state;
  const rooms = location.state;
  // const id = useParams();
  // const {isCalled, setCalled} = useState(false);

  // const bookingConfirmationEmail = async () => {
  //   try{
  //     console.log(id.bid);
  //     const response = await axios.get(`http://localhost:4444/api/booking-confirmation/${id.bid}`);
  //   }
  //   catch{
  //     console.log("error");
  //   }
  // }

  
  if (!roomData) {
    React.useEffect(() => {
      navigate("/");
    }, [navigate]);

    return <div>No room data available. Redirecting...</div>;
  }

  // if(!isCalled){
  //   bookingConfirmationEmail();
  //   setCalled(true);
  // }
  
  return (
    <div className="flex flex-col pt-12 bg-white">
      <div className="flex flex-col self-center px-10 w-full max-w-[1323px] max-md:max-w-full">
        <Header />
        <main>
            <div>
                <BookingConfirmTitle/>
                <div className="mt-10">
                    <BookingConfirmationCard {...roomData}{...rooms}/>
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
      <WhatsAppButton/>
      <Footer/>
    </div>
  );
};

export default BookingConfirm;
