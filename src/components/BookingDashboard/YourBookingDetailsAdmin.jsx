import React from "react";
import SideNav from "../SideNav";
import AdminNav from "./AdminNav";
import YourBookingDetailsFormAdmin from "./YourBookingDetailsFormAdmin";
import StayDetailsAdmin from "./StayDetailsAdmin";
import StatCard from "./StatCard";

const YourBookingDetailsAdmin = () => {

    const statCards = [
        { title: 'New Booking', value: '652', bgColor: 'bg-orange-100' },
        { title: 'Schedule Room', value: '221', bgColor: 'bg-violet-100' },
        { title: 'Check In', value: '58', bgColor: 'bg-pink-100' },
        { title: 'Check Out', value: '22', bgColor: 'bg-blue-100' },
    ];

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
            <YourBookingDetailsFormAdmin />
          </div>
          <hr className="my-4" />
          <div className="md:w-6/4">
            <StayDetailsAdmin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourBookingDetailsAdmin;
