import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatCard from './StatCard';
import BookingTable from './BookingTable';

const BookingDashboard = () => { 
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
    <main className="flex flex-col p-6 ">
      {error && <div className="text-red-500 mb-4">Error: {error}</div>} {/* Display error if exists */}
      <section className="w-full mb-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card, index) => (
            <StatCard key={index} {...card} />
          ))}
        </div>
      </section>
      <BookingTable />
    </main>
  );
};

export default BookingDashboard;
