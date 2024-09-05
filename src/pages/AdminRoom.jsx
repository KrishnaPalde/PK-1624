import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideNav from "../components/SideNav";
import StatCard from "../components/BookingDashboard/StatCard";
import AdminNav from "../components/BookingDashboard/AdminNav";
import RoomTable from "../components/BookingDashboard/RoomTable";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { SlClock } from "react-icons/sl";
const process = import.meta.env;

const AdminRoom = () => {

  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    checkIn: 0,
    checkOut: 0,
  });

  // Function to load stat cards data
  const loadStatCardsData = async () => {
    try {
      // const response = await axios.get('http://localhost:4444/api/admin/dashboard_stats'); 
      const response = await axios.get(`${process.VITE_HOST_URL}/api/admin/dashboard_stats`); 
      
      // Update the state with the response data
      setStats({
        total: response.data.total,
        upcoming: response.data.upcoming,
        checkIn: response.data['check-in'],
        checkOut: response.data['check-out'],
      });

      setError(null); // Clear any previous error

    } catch (error) {
      setError(error.response ? error.response.data.error : "Error loading data");
    }
  }

  // useEffect to load data on mount
  useEffect(() => {
    loadStatCardsData();
  }, []);

  // Updated stat cards with dynamic values from state
  const statCards = [
    { title: 'Total Bookings', value: stats.total, bgColor: 'bg-orange-100', icon: BsBookmarkCheckFill, iconColor: 'text-orange-400' },
    { title: 'Schedule Room', value: stats.upcoming, bgColor: 'bg-violet-100', icon: RiCalendarScheduleFill, iconColor: 'text-violet-400' },
    { title: 'Check In', value: stats.checkIn, bgColor: 'bg-pink-100', icon: SlClock, iconColor: 'text-pink-400'},
    { title: 'Check Out', value: stats.checkOut, bgColor: 'bg-blue-100', icon: SlClock, iconColor: 'text-blue-400'},
  ];
    
  return (
    <div className="flex w-full h-screen bg-[#f5f7fa]">
      <div className="lg:block lg:w-64">
        <SideNav />
      </div>
      <div></div>
      <div className="flex-1 overflow-auto">
        <AdminNav title="Rooms"/>
        <main className="flex flex-col p-6 ">
          <section className="w-full mb-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {statCards.map((card, index) => (
                <StatCard key={index} {...card} />
              ))}
            </div>
          </section>
          <RoomTable/>
        </main>
      </div>
    </div>
  );
};

export default AdminRoom;
