import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { RiMapPinLine } from "react-icons/ri";

function HotelCard({
  id,
  imageUrl,
  images,
  imageCount,
  title,
  name,
  city,
  description,
  guestCount,
  rating,
  price,
  weekdayPrice,
  weekendPrice,
  isWeekend,
  totalReviews,
  onSelect,
  onNext,
  isSelected,
  isLastSelected,
  room,
  roomCount,
  isLastRoom,
  disabled,
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const navigationState = {
      id,
      images,
      imageCount,
      title,
      name,
      city,
      description,
      guestCount,
      rating,
      price,
      weekdayPrice,
      weekendPrice,
      isWeekend,
      totalReviews,
    };
    navigate(`/room/${id}`, { state: navigationState });
  };

  const handleNextClick = () => {
    const navigationState = {
      id,
      images,
      imageCount,
      title,
      name,
      city,
      description,
      guestCount,
      rating,
      price,
      weekdayPrice,
      weekendPrice,
      isWeekend,
      totalReviews,
    };
    navigate(`/room/${id}/details`, { state: navigationState });
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

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

  const renderActionButton = () => {
    if (roomCount === 1) {
      return (
        <button
          onClick={() => onNext(room)}
          className="w-full px-6 py-2 text-sm font-medium text-white transition-colors duration-300  rounded-full sm:w-auto bg-[#255d69] hover:bg-[#243947] disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          Next
        </button>
      );
    }

    if (isLastRoom) {
      return (
        <button
          onClick={() => onNext(room)}
          className="w-full px-6 py-2 text-sm font-medium text-white transition-colors duration-300 bg-[#255d69] hover:bg-[#243947] rounded-full sm:w-auto  disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          Continue
        </button>
      );
    }

    return (
      <button
        onClick={() => onSelect(room)}
        className={`w-full px-6 py-2 text-sm font-medium text-white transition-colors duration-300 rounded-full sm:w-auto ${
          isSelected
            ? "bg-[#255d69] hover:bg-[#243947]"
            : "bg-[#255d69] hover:bg-[#243947]"
        } disabled:bg-gray-400 disabled:cursor-not-allowed`}
        disabled={disabled || (isLastSelected && !isSelected)}
      >
        {isSelected ? "Selected" : "Select Room"}
      </button>
    );
  };

  const isDisabled = isLastSelected && !isSelected;

  return (
    <div
      className={`space-y-4 overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl ${
        isSelected ? "border-2 border-blue-500" : ""
      }`}
    >
      <div className="sm:flex">
        <div className="relative sm:w-2/5 md:w-1/3">
          <img
          loading="lazy"
            src={images[0]}
            alt={title}
            className="object-cover w-full h-48 sm:h-full"
          />
          <div className="absolute flex items-center space-x-2 top-2 left-2">
            <span className="flex items-center px-2 py-1 text-xs font-semibold text-white bg-black rounded-full bg-opacity-70">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {images.length}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between p-4 sm:p-6 sm:w-3/5 md:w-2/3">
          <div>
            <div className="flex items-start justify-between">
              <div className="mb-2">
                <h2 className="text-xl font-bold text-gray-800">{name}</h2>
               {city && (
                  <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                    <RiMapPinLine className="text-[#335064] w-4 h-4" />
                    <span className="capitalize">{city}</span>
                  </div>
                )}

              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500">starting from</p>
                <p className="text-2xl font-bold text-[#335064]">
                  ₹{price}
                  <span className="text-sm font-normal">/night</span>
                </p>
                <p className="text-xs text-gray-500">excl. tax</p>
              </div>
            </div>
            <p className="mb-4 text-sm text-gray-600 line-clamp-3">
              {description}
            </p>
            <div className="flex items-center mb-4 space-x-4">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-sm text-gray-600">
                  {name == "Panoramic View" ? 10 : guestCount} Guests
                </span>
              </div>
              <div className="flex items-center">
                {renderStars()}
                <span className="ml-1 text-sm text-gray-600">
                  {rating} Stars
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-[#c0c9cf] rounded-lg">
                <span className="text-lg font-semibold text-[#335064]">
                  {rating || 0}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-800">{getTitle()}</p>
                <p className="text-sm text-gray-600">{totalReviews} reviews</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between mt-6 space-y-2 sm:space-y-0">
            <button
              onClick={handleCardClick}
              className="w-full px-6 py-2 text-sm font-medium text-[#335064] transition-colors duration-300 bg-blue-100 rounded-full sm:w-auto hover:bg-blue-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
              disabled={disabled}
            >
              View Details
            </button>
            {renderActionButton()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;