import React from "react";
import { useNavigate } from "react-router-dom";

function formatDate(date) {
  // Define the array of month abbreviations
  const monthAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Extract the day, month, and year from the Date object
  const day = date.getDate(); // Day of the month
  const month = monthAbbr[date.getMonth()]; // Month abbreviation
  const year = date.getFullYear(); // Full year

  // Return the formatted date string
  return `${day} ${month} ${year}`;
}

function BookingCard({bookingId, firstName, lastName, checkInDate, checkOutDate }) {
  const navigate = useNavigate(); 
  return (
    <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full" onClick={() => navigate(`/admin/booking/details/${bookingId}`)} >
      <div className="flex flex-col grow justify-center items-center py-11 w-full bg-white rounded-xl border border-solid border-blue-500 border-opacity-50 min-h-[267px] shadow-[0px_8px_12px_rgba(47,131,255,0.1)] max-md:mt-5">
        <img
          loading="lazy"
          src="https://img.icons8.com/officel/80/circled-user-male-skin-type-3.png"
          alt={`Profile picture of ${name}`}
          className="object-contain rounded-full aspect-square w-[90px]"
        />
        <h2 className="mt-5 text-2xl font-bold leading-none text-stone-500">
          {firstName} {lastName}
        </h2>
        <p className="mt-5 text-lg leading-normal text-center text-neutral-400 pl-5 pr-5">
          {formatDate(new Date(checkInDate))} - {formatDate(new Date(checkOutDate))}
        </p>
      </div>
    </div>
  );
}

export default BookingCard;
