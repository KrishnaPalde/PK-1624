import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Header from "../components/Header";
import BookingForm from "../components/BookingForm";
import RoomDetailsCard from "../components/RoomDetailsCard";
import RoomImages from "../components/RoomImages";
import RoomOverview from "../components/RoomOverview";
import AmenitiesList from "../components/AmenitiesList";
import RoomReviewSection from "../components/RoomReviewSection";
import Testimonials from "../components/Testimonials";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { useBooking } from "../contexts/BookingFormContext";
import WhatsAppButton from "../components/WhatsappButton";
const process = import.meta.env;

const RoomDetailsPage = () => {
  const { id: roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [roomData, setRoomData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const isWeekend = () => {
    const today = new Date();
    return today.getDay() === 0 || today.getDay() === 6;
  };

  // Reset state when roomId changes
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setRoomData(null);
  }, [roomId]);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${process.VITE_HOST_URL}/api/rooms/${roomId}`);
        const fetchedData = response.data;
        
        setRoomData({
          ...fetchedData,
          price: isWeekend() && fetchedData.weekend ? fetchedData.weekend : fetchedData.price,
          weekdayPrice: fetchedData.price,
          weekendPrice: fetchedData.weekend,
          isWeekend: isWeekend()
        });
      } catch (error) {
        console.error("Error fetching room data:", error);
        setError("Failed to fetch room data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (roomId) {
      fetchRoomData();
    }
  }, [roomId]); // Only depend on roomId

  if (isLoading) {
    return (
      <div className="flex flex-col max-w-full pt-12 bg-white">
        <div className="flex flex-col self-center w-full max-w-[1323px] max-md:max-w-full px-10">
          <Header />
          <div className="flex justify-center items-center min-h-[400px]">
            <div>Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col max-w-full pt-12 bg-white">
        <div className="flex flex-col self-center w-full max-w-[1323px] max-md:max-w-full px-10">
          <Header />
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-red-500">Error: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!roomData) {
    return (
      <div className="flex flex-col max-w-full pt-12 bg-white">
        <div className="flex flex-col self-center w-full max-w-[1323px] max-md:max-w-full px-10">
          <Header />
          <div className="flex justify-center items-center min-h-[400px]">
            <div>No room data available.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-full pt-12 bg-white">
      <div className="flex flex-col self-center w-full max-w-[1323px] max-md:max-w-full px-10">
        <Header />
        <main>
          <div className="mt-10">
            <BookingForm />
            <RoomDetailsCard {...roomData} />
            {roomData.images && roomData.images.length > 0 && (
              <RoomImages images={roomData.images} />
            )}
            {/* <RoomOverview rating={roomData.rating} reviews={roomData.totalReviews}/> */}
            {/* {roomData.amenities && roomData.amenities.length > 0 && ( */}
              <div className="mt-10">
                <AmenitiesList />
              </div>
            {/* )} */}
            {/* {roomData.totalReviews || (
              <div className="mt-10">
                <RoomReviewSection rating={roomData.rating} reviews={roomData.totalReviews} />
              </div>
            )} */}
            <Testimonials />
            <NewsLetter />
          </div>
        </main>
      </div>
      <WhatsAppButton/>
      <Footer />
    </div>
  );
};

export default RoomDetailsPage;