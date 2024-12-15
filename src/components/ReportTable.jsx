import React from "react";

const ReportTable = ({ bookings, headers }) => {
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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


  return (
    <section className="p-6 bg-white rounded-xl shadow-lg">
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-200 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-sm font-semibold text-left text-gray-600 border-b border-gray-200"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-sm text-gray-700">
                  #{booking.bookingId}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {`${booking.firstName} ${booking.lastName}`}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {booking.rooms.join(", ")}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {formatDate(booking.checkInDate)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {formatDate(booking.checkOutDate)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  ₹{booking.totalPayment.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 capitalize">
                  {booking.source}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 capitalize">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(determineStatus(new Date(booking.checkInDate), new Date(booking.checkOutDate)))}`}>
                      {determineStatus(new Date(booking.checkInDate), new Date(booking.checkOutDate))}
                    </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="px-4 py-3 text-center text-gray-500"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </section>
  );
};

export default ReportTable;
