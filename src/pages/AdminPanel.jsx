import React from 'react';
import SideNav from '../components/SideNav';
import BookingDashboard from '../components/BookingDashboard/BookingDashboard';

const AdminPanel = () => {
  return (
    <div className="flex w-full h-screen bg-[#f5f7fa]">
      <div className="md:w-1/5">
        <SideNav />
      </div>
      <div className="p-4 pl-4 overflow-auto md:w-4/5">
        <BookingDashboard />
      </div>
    </div>
  );
};

export default AdminPanel;