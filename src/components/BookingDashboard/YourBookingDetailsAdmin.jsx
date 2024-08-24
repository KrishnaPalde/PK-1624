import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideNav from "../SideNav";
import AdminNav from "./AdminNav";
import YourBookingDetailsFormAdmin from "./YourBookingDetailsFormAdmin";
import StayDetailsAdmin from "./StayDetailsAdmin";
import StatCard from "./StatCard";

const YourBookingDetailsAdmin = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);
  const [error, setError] = useState(null);
  const { bookingId } = useParams();
  const lastFourChars = bookingId.slice(-4);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        // const bookingResponse = await fetch(`http://localhost:4444/api/admin/bookings/${lastFourChars}`);
        const bookingResponse = await fetch(`https://pk-1624.onrender.com/api/admin/bookings/${lastFourChars}`);
        if (!bookingResponse.ok) {
          throw new Error(`HTTP error! status: ${bookingResponse.status}`);
        }
        const bookingData = await bookingResponse.json();
        setBookingDetails(bookingData);

        // const roomResponse = await fetch(`http://localhost:4444/api/admin/bookings/${lastFourChars}/room`);
        const roomResponse = await fetch(`https://pk-1624.onrender.com/api/admin/bookings/${lastFourChars}/room`);
        if (!roomResponse.ok) {
          throw new Error(`HTTP error! status: ${roomResponse.status}`);
        }
        const roomData = await roomResponse.json();
        setRoomDetails(roomData);
      } catch (error) {
        console.error('Error fetching details:', error);
        setError(error.message);
      }
    };

    fetchBookingDetails();
  }, [lastFourChars]);

  const statCards = [
    { title: 'New Booking', value: '652', bgColor: 'bg-orange-100' },
    { title: 'Schedule Room', value: '221', bgColor: 'bg-violet-100' },
    { title: 'Check In', value: '58', bgColor: 'bg-pink-100' },
    { title: 'Check Out', value: '22', bgColor: 'bg-blue-100' },
  ];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex w-full min-h-screen bg-[#f5f7fa]">
      <div className="md:w-2/12">
        <SideNav />
      </div>
      <div className="overflow-auto md:w-11/12">
        <AdminNav />
        <section className="w-full p-6 pb-0 mb-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card, index) => (
              <StatCard key={index} {...card} />
            ))}
          </div>
        </section>
        <div className="flex flex-col justify-center mt-10 md:flex-row">
          <div className="md:w-6/12">
            {bookingDetails && <YourBookingDetailsFormAdmin userDetails={bookingDetails} />}
          </div>
          <hr className="my-4" />
          <div className="md:w-6/4">
            {bookingDetails && roomDetails && (
              <StayDetailsAdmin bookingDetails={bookingDetails} roomDetails={roomDetails} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourBookingDetailsAdmin;