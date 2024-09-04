// import React,{useState, useEffect} from 'react';
// import SideNav from '../components/SideNav';
// import AdminNav from '../components/BookingDashboard/AdminNav';
// import StatCard from "../components/BookingDashboard/StatCard";
// import RoomList from "../components/BookingDashboard/RoomList";
// import CustomerReviews from '../components/BookingDashboard/CustomerReviews';
// import DatePicker from '../components/BookingDashboard/DatePicker';
// import NewBooking from '../components/BookingDashboard/NewBooking';

// const AdminDashboard = () => {
//   const [error, setError] = useState(null);
//   const [stats, setStats] = useState({
//     total: 0,
//     upcoming: 0,
//     checkIn: 0,
//     checkOut: 0,
//   });

//   // Function to load stat cards data
//   const loadStatCardsData = async () => {
//     try {
//       const response = await axios.get('http://localhost:4444/api/admin/dashboard_stats'); 
//       // const response = await axios.get('https://pk-1624.onrender.com/api/admin/dashboard_stats'); 
//       // Update the state with the response data
//       setStats({
//         total: response.data.total,
//         upcoming: response.data.upcoming,
//         checkIn: response.data['check-in'],
//         checkOut: response.data['check-out'],
//       });

//       setError(null); // Clear any previous error

//     } catch (error) {
//       setError(error.response ? error.response.data.error : "Error loading data");
//     }
//   }

//   // useEffect to load data on mount
//   useEffect(() => {
//     loadStatCardsData();
//   }, []);

//   // Updated stat cards with dynamic values from state
//   const statCards = [
//     { title: 'New Booking', value: stats.total, bgColor: 'bg-orange-100' },
//     { title: 'Schedule Room', value: stats.upcoming, bgColor: 'bg-violet-100' },
//     { title: 'Check In', value: stats.checkIn, bgColor: 'bg-pink-100' },
//     { title: 'Check Out', value: stats.checkOut, bgColor: 'bg-blue-100' },
//   ];
  
//   return (
//     <div className="flex w-full h-screen bg-[#f5f7fa]">
//       <div className="lg:w-2/12 md:w-3/12 lg:ml-6 xl:ml-0">
//         <SideNav />
//       </div>
//       <div className="overflow-auto lg:w-11/12">
//         <AdminNav />
//         <main className="flex flex-col p-6 ">
//       <section className="w-full mb-6">
//         <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           {statCards.map((card, index) => (
//             <StatCard key={index} {...card} />
//           ))}
//         </div>
//       </section>
//     </main>
//     <div className='px-8'>
//     <RoomList/>  
//     </div>
//     <div className='flex flex-col px-8 mt-10 md:flex-row'>
//       <div className='md:w-2/4'>
//         <DatePicker/>
//       </div>
//       <div className='md:w-2/4'>
//       <CustomerReviews/>
//       </div>
//     </div>
//     <div className='px-8 mt-10'>
//       <NewBooking/>
//     </div>
    
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;





import React, { useState, useEffect } from 'react';
import SideNav from '../components/SideNav';
import AdminNav from '../components/BookingDashboard/AdminNav';
import StatCard from "../components/BookingDashboard/StatCard";
import RoomList from "../components/BookingDashboard/RoomList";
import CustomerReviews from '../components/BookingDashboard/CustomerReviews';
import DatePicker from '../components/BookingDashboard/CustomCalendar';
import NewBooking from '../components/BookingDashboard/NewBooking';
import axios from 'axios';
const process = import.meta.env;

const AdminDashboard = () => {
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    checkIn: 0,
    checkOut: 0,
  });

  const loadStatCardsData = async () => {
    try {
      // const response = await axios.get('http://localhost:4444/api/admin/dashboard_stats');
      const response = await axios.get(`${process.VITE_HOST_URL}/api/admin/dashboard_stats`);
      setStats({
        total: response.data.total,
        upcoming: response.data.upcoming,
        checkIn: response.data['check-in'],
        checkOut: response.data['check-out'],
      });
      setError(null);
    } catch (error) {
      setError(error.response ? error.response.data.error : "Error loading data");
    }
  };

  useEffect(() => {
    loadStatCardsData();
  }, []);

  const statCards = [
    { title: 'Total Bookings', value: stats.total, bgColor: 'bg-orange-100' },
    { title: 'Schedule Room', value: stats.upcoming, bgColor: 'bg-violet-100' },
    { title: 'Check In', value: stats.checkIn, bgColor: 'bg-pink-100' },
    { title: 'Check Out', value: stats.checkOut, bgColor: 'bg-blue-100' },
  ];

  return (
    <div className="flex w-full h-screen bg-[#f5f7fa]">
      <div className="lg:block lg:w-64">
        <SideNav />
      </div>
      
      <div className="flex-1 overflow-auto">
        <AdminNav title="Dashboard"/>
        <main className="flex flex-col p-6">
          <section className="w-full mb-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {statCards.map((card, index) => (
                <StatCard key={index} {...card} />
              ))}
            </div>
          </section>
        </main>
        <div className='px-8'>
          <RoomList />
        </div>
        <div className='flex flex-col px-8 mt-10 md:flex-row'>
          <div className='md:w-2/4'>
            <DatePicker />
          </div>
          <div className='md:w-2/4'>
            <CustomerReviews />
          </div>
        </div>
        <div className='px-8 mt-10'>
          <NewBooking />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
