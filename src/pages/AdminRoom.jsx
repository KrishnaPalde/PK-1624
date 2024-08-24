import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideNav from "../components/SideNav";
import StatCard from "../components/BookingDashboard/StatCard";
import AdminNav from "../components/BookingDashboard/AdminNav";
import RoomTable from "../components/BookingDashboard/RoomTable";

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
      const response = await axios.get('http://localhost:4444/api/admin/dashboard_stats'); // Adjust the endpoint if needed
      
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
    { title: 'New Booking', value: stats.total, bgColor: 'bg-orange-100' },
    { title: 'Schedule Room', value: stats.upcoming, bgColor: 'bg-violet-100' },
    { title: 'Check In', value: stats.checkIn, bgColor: 'bg-pink-100' },
    { title: 'Check Out', value: stats.checkOut, bgColor: 'bg-blue-100' },
  ];
    
  return (
    <div className="flex w-full h-screen bg-[#f5f7fa]">
      <div className="md:w-2/12">
        <SideNav />
      </div>
      <div></div>
      <div className="overflow-auto md:w-11/12">
        <AdminNav />
        <main className="flex flex-col p-6 ">
          <section className="w-full mb-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {statCards.map((card, index) => (
                <StatCard key={index} {...card} />
              ))}
            </div>
          </section>
          <RoomTable />
        </main>
      </div>
    </div>
  );
};

export default AdminRoom;
