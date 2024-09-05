import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideNav from "../SideNav";
import AdminNav from "./AdminNav";
import YourBookingDetailsFormAdmin from "./YourBookingDetailsFormAdmin";
import StayDetailsAdmin from "./StayDetailsAdmin";
import StatCard from "./StatCard";
import axios from "axios";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { SlClock } from "react-icons/sl";
const process = import.meta.env;

const YourBookingDetailsAdmin = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);
  const [error, setError] = useState(null);
  const { bookingId } = useParams();
  const lastFourChars = bookingId.slice(-4);
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    checkIn: 0,
    checkOut: 0,
  });

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        // const bookingResponse = await fetch(`http://localhost:4444/api/admin/bookings/${lastFourChars}`);
        const bookingResponse = await fetch(`${process.VITE_HOST_URL}/api/admin/bookings/${lastFourChars}`);
        if (!bookingResponse.ok) {
          throw new Error(`HTTP error! status: ${bookingResponse.status}`);
        }
        const bookingData = await bookingResponse.json();
        setBookingDetails(bookingData);

        // const roomResponse = await fetch(`http://localhost:4444/api/admin/bookings/${lastFourChars}/room`);
        const roomResponse = await fetch(`${process.VITE_HOST_URL}/api/admin/bookings/${lastFourChars}/room`);
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

    const loadStatCardsData = async () => {
      try {
        // const response = await axios.get('http://localhost:4444/api/admin/dashboard_stats'); 
        const response = await axios.get(`${process.VITE_HOST_URL}/api/admin/dashboard_stats`); 
        console.log("Data " + response.data);
        // Update the state with the response data
        setStats({
          total: response.data.total,
          upcoming: response.data.upcoming,
          checkIn: response.data['check-in'],
          checkOut: response.data['check-out'],
        });
  
        setError(null); // Clear any previous error
  
      } catch (error) {
        console.log(error);
        setError(error.response ? error.response.data.error : "Error loading data");
      }
    };
    fetchBookingDetails();
    loadStatCardsData();
  }, [lastFourChars]);

  
  // Updated stat cards with dynamic values from state
  const statCards = [
    { title: 'Total Bookings', value: stats.total, bgColor: 'bg-orange-100', icon: BsBookmarkCheckFill, iconColor: 'text-orange-400' },
    { title: 'Schedule Room', value: stats.upcoming, bgColor: 'bg-violet-100', icon: RiCalendarScheduleFill, iconColor: 'text-violet-400' },
    { title: 'Check In', value: stats.checkIn, bgColor: 'bg-pink-100', icon: SlClock, iconColor: 'text-pink-400'},
    { title: 'Check Out', value: stats.checkOut, bgColor: 'bg-blue-100', icon: SlClock, iconColor: 'text-blue-400'},
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