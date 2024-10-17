import React from "react";
import { useBooking } from "../contexts/BookingFormContext";
import { Users } from "lucide-react";

function StayInfo({ name, title, rating, price, images, totalReviews }) {
  const { bookingInfo } = useBooking();

  if (!bookingInfo.checkIn) {
    return <div>No room data available. Please select booking details.</div>;
  }

  const getTitle = () => {
    switch (Math.round(rating)) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Average";
      case 4:
        return "Good";
      case 5:
        return "Excellent";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Tranquil Trails</h2>
          <p>
            {name && title
              ? `${name} - ${title}`
              : "Room details not available"}
          </p>
        </div>
        {rating && (
          <div className="flex items-center">
            <span className="mr-2 font-bold">{rating.toFixed(1)}</span>
            <span>
              {getTitle()} ({totalReviews} reviews)
            </span>
          </div>
        )}
      </div>

      {images && images.length > 0 && (
        <img
        loading="lazy"
          src={images[0]}
          alt="Room"
          className="object-cover w-full h-48 mt-4 rounded-lg"
        />
      )}

      <p className="mt-4">
        Unwind in comfort with a plush king bed and a private balcony
        overlooking the city.
      </p>

      <div className="flex items-center mt-4">
        <Users className="mr-2" />
        <span>
          {bookingInfo.adults} Adults, {bookingInfo.children} Children
        </span>
      </div>
    </div>
  );
}

export default StayInfo;
