import React from "react";
import SideNav from "../components/SideNav";
import AdminNav from "../components/BookingDashboard/AdminNav";
import BlogPostList from "../components/BookingDashboard/BlogPostList";
import StatCard from "../components/BookingDashboard/StatCard";

const AdminBlog = () => {
    const statCards = [
        { title: 'New Booking', value: '652', bgColor: 'bg-orange-100' },
        { title: 'Schedule Room', value: '221', bgColor: 'bg-violet-100' },
        { title: 'Check In', value: '58', bgColor: 'bg-pink-100' },
        { title: 'Check Out', value: '22', bgColor: 'bg-blue-100' },
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
        <BlogPostList />
    </main>
      </div>
    </div>
  );
};

export default AdminBlog;
