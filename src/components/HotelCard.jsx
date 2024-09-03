import React from "react";
import PaymentButton from '../components/PaymentButton';
import { useNavigate, Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function HotelCard({
  id,
  imageUrl,
  images,
  imageCount,
  title,
  description,
  guestCount,
  rating,
  price,
  reviews = 371,
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/room/${id}`, { 
      state: { 
        id, 
        images, 
        imageCount, 
        title, 
        description, 
        guestCount, 
        rating, 
        price, 
        reviews 
      } 
    });
  };

  const handleNextClick = () => {
    navigate(`/room/${id}/details`, { 
      state: { 
        id, 
        images, 
        imageCount, 
        title, 
        description, 
        guestCount, 
        rating, 
        price, 
        reviews 
      } 
    });
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

  return (
    <article className="flex flex-col mt-4 overflow-hidden bg-white rounded-lg shadow-md sm:flex-row">
      <div className="relative w-full sm:w-1/3">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-48 sm:h-full"
        />
        <div className="absolute px-2 py-1 text-xs bg-white rounded top-2 left-2 bg-opacity-70">
          {imageCount} images
        </div>
      </div>
      <div className="relative flex flex-col justify-between w-full p-4 sm:w-2/3">
        <div className="absolute text-right top-4 right-4">
          <p className="text-xs">starting from</p>
          <p className="text-xl font-bold text-blue-600">₹{price}<span className="text-sm">/night</span></p>
          <p className="text-xs">excl. tax</p>
        </div>
        <div className="w-2/3">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="mt-1 text-sm">{description}</p>
          <div className="flex items-center mt-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fe3424ec5f6c7f0ad3521552c86e462283056e6067d93a37bc9133ff225abe5?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
              alt="Guest icon"
              className="w-4 h-4 mr-1"
            />
            <span className="text-sm">{guestCount} Guest</span>
          </div>
          <div className="flex items-center mt-2">
            {renderStars()}
            <span className="ml-1 text-sm">{rating} Star</span>
          </div>
          <div className="flex items-center mt-2">
            <div className="flex items-center justify-center p-4 text-lg font-normal text-gray-800 border rounded w-7 h-7 border-sky-400">
              <span>{rating.toFixed(1)}</span>
            </div>
            <div className="flex flex-row ml-4 space-x-1 text-sm text-gray-600">
              <p className="font-medium">{getTitle()}</p>
              <p>{reviews} reviews</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-end justify-between mt-4">
          <div className="flex items-center mb-2 sm:mb-0">
            <button className="p-2 mr-2 border rounded border-sky-400 sm:mr-4">
              <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
            <button className="px-4 py-2 mr-2 border rounded text-sky-400 border-sky-400" onClick={handleCardClick}>
              View Detail
            </button>
            <button className="px-4 py-2 text-white rounded bg-sky-400" onClick={handleNextClick}>
              Next
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default HotelCard;
