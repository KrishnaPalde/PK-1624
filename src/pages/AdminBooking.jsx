import React from "react";
import SideNav from "../components/SideNav";
import BookingDashboard from "../components/BookingDashboard/BookingDashboard";
import AdminNav from "../components/BookingDashboard/AdminNav";


const AdminBooking = () => {
  return (
    <div className="flex w-full h-screen bg-[#f5f7fa]">
      <div className="lg:block lg:w-64">
        <SideNav />
      </div>
      <div className="flex-1 overflow-auto">
        <AdminNav />
        <BookingDashboard /> 
      </div>
    </div>
  );
};

export default AdminBooking;
