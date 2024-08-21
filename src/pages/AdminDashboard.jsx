import React from 'react';
import SideNav from '../components/SideNav';
import AdminNav from '../components/BookingDashboard/AdminNav';

const AdminDashboard = () => {
  return (
    <div className="flex max-w-full h-screen bg-[#f5f7fa]">
      <div className="md:w-2/12">
        <SideNav />
      </div>
      <div>
        
      </div>
      <div className="overflow-auto md:w-11/12">
        <AdminNav/>
      </div>
    </div>
  );
};

export default AdminDashboard;