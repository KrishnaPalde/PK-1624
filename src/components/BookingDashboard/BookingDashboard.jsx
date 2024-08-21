import React from 'react';
import StatCard from './StatCard';
import BookingTable from './BookingTable';

const BookingDashboard = () => {
  const statCards = [
    { title: 'New Booking', value: '652', bgColor: 'bg-orange-100' },
    { title: 'Schedule Room', value: '221', bgColor: 'bg-violet-100' },
    { title: 'Check In', value: '58', bgColor: 'bg-pink-100' },
    { title: 'Check Out', value: '22', bgColor: 'bg-blue-100' },
];

  return (
    <main className="flex flex-col p-6 ">
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