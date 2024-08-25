import React from "react";
import SideNav from "../components/SideNav";
import BookingDashboard from "../components/BookingDashboard/BookingDashboard";
import AdminNav from "../components/BookingDashboard/AdminNav";


const AdminBooking = () => {
  return (
    <div className="flex w-full h-screen bg-[#f5f7fa]">
      <div className="md:w-2/12">
        <SideNav />
      </div>
      <div className="overflow-auto md:w-11/12">
        <AdminNav />
        <BookingDashboard />
        
      </div>
    </div>
  );
};

export default AdminBooking;
