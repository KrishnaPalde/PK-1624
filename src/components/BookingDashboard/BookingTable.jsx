import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CreateBookingForm from './CreateBookingForm';
const process = import.meta.env;

const BookingTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${process.VITE_HOST_URL}/api/admin/bookings`);
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
  
    fetchBookings();
  }, [currentPage]);

  const handleCreateBooking = async (bookingData) => {
    try {
      const response = await fetch(`${process.VITE_HOST_URL}/api/admin/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const newBooking = await response.json();
      setBookings(prev => [...prev, newBooking]);
      // Optionally navigate to the new booking details
      navigate(`/admin/booking/details/${newBooking.bookingId}`);
    } catch (error) {
      console.error('Error creating booking:', error);
      // Handle error (show notification, etc.)
    }
  };

  const totalItems = bookings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'booked':
        return 'text-blue-500 bg-indigo-50';
      case 'check out':
        return 'text-red-400 bg-rose-50';
      case 'check in':
        return 'text-emerald-400 bg-emerald-50';
      case 'completed':
        return 'text-gray-500 bg-gray-50';
      default:
        return 'text-blue-500 bg-indigo-50';
    }
  };

  const determineStatus = (checkInDate, checkOutDate) => {
    const today = new Date();
    if (today.toDateString() === checkInDate.toDateString()) {
      return 'Check In';
    } else if (today.toDateString() === checkOutDate.toDateString()) {
      return 'Check Out';
    } else if (today > checkOutDate) {
      return 'Completed';
    } else {
      return 'Booked';
    }
  };

  const headers = [
    { title: 'Booking ID', width: 'w-[117px]' },
    { title: 'Name', width: 'flex-1' },
    { title: 'Room Type', width: 'w-[212px]' },
    { title: 'Mobile Number', width: 'flex-1' },
    { title: 'Total Payment', width: 'flex-1' },
    { title: 'Status', width: 'flex-1' },
  ];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBookings = bookings.slice(startIndex, endIndex);

  return (
    <>
      <section className="w-full overflow-hidden bg-white shadow-md rounded-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Bookings</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Create Booking
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                {headers.map((header, index) => (
                  <th key={index} className={`px-4 py-2 text-xs font-medium text-left text-gray-500 ${header.width}`}>
                    {header.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedBookings.map((booking, index) => (
                <tr 
                  key={index} 
                  className="border-t cursor-pointer border-indigo-50 hover:bg-blue-100" 
                  onClick={() => navigate(`/admin/booking/details/${booking.bookingId}`)} 
                >
                  <td className="px-4 py-4 whitespace-nowrap">#{booking.bookingId}</td>
                  <td className="py-4 pl-4">{`${booking.firstName} ${booking.lastName}`}</td>
                  <td className="px-4 py-4">{booking.roomName || 'Unknown Room'}</td>
                  <td className="px-4 py-4">{booking.phoneNumber}</td>
                  <td className="px-4 py-4">{`₹${booking.totalPayment}`}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(determineStatus(new Date(booking.checkInDate), new Date(booking.checkOutDate)))}`}>
                      {determineStatus(new Date(booking.checkInDate), new Date(booking.checkOutDate))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <nav className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{Math.min(endIndex, totalItems)}</span> of{' '}
                <span className="font-medium">{totalItems}</span> results
              </p>
            </div>
            <div>
              <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  <FaChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                {[...Array(totalPages).keys()].map((page) => (
                  <button
                    key={page + 1}
                    onClick={() => setCurrentPage(page + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                      ${page + 1 === currentPage
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                  >
                    {page + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50"
                >
                  <span className="sr-only">Next</span>
                  <FaChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </nav>
      </section>

      <CreateBookingForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateBooking}
      />
    </>
  );
};

export default BookingTable;