import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const BookingTable = () => {
  const allBookings = [
    { id: '#5644', name: 'Alexander', roomType: 'Room with View', totalAmount: '₹ 4670', amountPaid: '₹ 2000', status: 'Booked' },
    { id: '#6112', name: 'Pegasus', roomType: 'Deluxe Room', totalAmount: '₹ 6450', amountPaid: '₹ 6450', status: 'Check Out' },
    { id: '#6141', name: 'Martin', roomType: 'Penthouse', totalAmount: '₹ 686', amountPaid: '₹ 400', status: 'Check Out' },
    { id: '#6535', name: 'Cecil', roomType: 'Penthouse', totalAmount: '₹ 8413', amountPaid: '₹ 2500', status: 'Check In' },
    { id: '#6541', name: 'Luke', roomType: 'Room with View', totalAmount: '₹ 8413', amountPaid: '₹ 2000', status: 'Booked' },
    { id: '#9846', name: 'Yadrin', roomType: 'Deluxe Room', totalAmount: '₹ 6840', amountPaid: '₹ 2000', status: 'Booked' },
    { id: '#4921', name: 'Kiand', roomType: 'Deluxe Room', totalAmount: '₹ 6840', amountPaid: '₹ 5124', status: 'Check In' },
    { id: '#4922', name: 'Kiand', roomType: 'Penthouse', totalAmount: '₹ 9840', amountPaid: '₹ 5130', status: 'Check In' },
    { id: '#9841', name: 'Turen', roomType: 'Room with View', totalAmount: '₹ 5425', amountPaid: '₹ 5425', status: 'Check out' },
  ];

  const headers = [
    { title: 'Booking ID', width: 'w-[117px]' },
    { title: 'Name', width: 'flex-1' },
    { title: 'Room Type', width: 'w-[212px]' },
    { title: 'Total amount', width: 'flex-1' },
    { title: 'Amount paid', width: 'flex-1' },
    { title: 'Status', width: 'flex-1' },
    { title: '', width: 'w-[70px]' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState([]);
  const itemsPerPage = 10;
  const totalItems = allBookings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setBookings(allBookings.slice(startIndex, endIndex));
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'booked':
        return 'text-blue-500 bg-indigo-50';
      case 'check out':
        return 'text-red-400 bg-rose-50';
      case 'check in':
        return 'text-emerald-400 bg-emerald-50';
      default:
        return 'text-blue-500 bg-indigo-50';
    }
  };

  return (
    <section className="w-full overflow-hidden bg-white shadow-md rounded-xl">
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
            {bookings.map((booking, index) => (
              <tr key={index} className="border-t border-indigo-50">
                <td className="px-4 py-4 whitespace-nowrap">{booking.id}</td>
                <td className="px-4 py-4">{booking.name}</td>
                <td className="px-4 py-4">{booking.roomType}</td>
                <td className="px-4 py-4">{booking.totalAmount}</td>
                <td className="px-4 py-4">{booking.amountPaid}</td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <button className="p-2">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/1823ef587bd602013eadc29d35e28d27ffb57a7772e6b58df111657d87d3779c?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                      alt=""
                      className="w-6 h-6"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex justify-between flex-1 sm:hidden">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{' '}
              <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Previous</span>
                <FaChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page + 1}
                  onClick={() => handlePageChange(page + 1)}
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
                onClick={() => handlePageChange(currentPage + 1)}
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
  );
};

export default BookingTable;