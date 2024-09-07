import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RoomDetailsCard = ({ 
  title, 
  name,
  id,
  description, 
  rating, 
  images,
  imageCount,
  reviews, 
  price,
  weekdayPrice,
  weekendPrice,
  isWeekend, 
  guestCount,
  amenities = []
}) => {

  const navigate = useNavigate();
  const handleNextClick = () => {
    navigate(`/room/${id}/details`, { 
      state: { 
        id, 
        images, 
        imageCount, 
        title, 
        name,
        description, 
        guestCount, 
        rating, 
        price,
        weekdayPrice,
  weekendPrice,
  isWeekend,
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
    <article className="flex flex-col items-start justify-between gap-5 p-4 mt-6 mb-6 sm:flex-row">
      <div className="flex flex-col w-full sm:w-2/3 text-neutral-900">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <h2 className="text-xl font-bold sm:text-2xl">{name + " - " + title}</h2>
          <div className="flex items-center gap-1 text-xs font-medium">
            <div className="flex">{renderStars()}</div>
            <div>{rating} Star</div>
          </div>
        </header>
        <div className="flex flex-col mt-3 font-medium">
          <p className="text-sm">{description}</p>
          <div className="flex items-center mt-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fe3424ec5f6c7f0ad3521552c86e462283056e6067d93a37bc9133ff225abe5?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
              alt="Guest icon"
              className="w-4 h-4 mr-1"
            />
            <span className="text-sm">{guestCount} Guest</span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <div className="w-10 px-3 py-2 text-center border rounded border-sky-400">
              {rating.toFixed(1)}
            </div>
            <div>
              <span className="font-bold">{getTitle()}</span> {reviews} reviews
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start w-full mt-4 sm:items-end sm:w-1/3 sm:mt-0">
        <div className="text-2xl font-bold text-blue-600">
          <span className="leading-7">₹</span>
          <span className="text-3xl leading-10">{isWeekend ? price : price}</span>
          <span className="text-sm leading-4">/night</span>
        </div>
        <p className="text-xs">excl. tax</p>
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center justify-center w-12 h-12 rounded">
              <img
                loading="lazy"
                src={amenity.icon}
                className="object-contain w-5 h-5"
                alt={amenity.name}
              />
            </div>
          ))}
        </div>
        {/* <Link to="/yourdetails"> */}
        <button className="w-full sm:w-[150px] mt-4 p-3 bg-sky-400 rounded text-sm font-semibold text-white" onClick={handleNextClick}>
          Book now
        </button>
        {/* </Link> */}
      </div>
    </article>
  );
};

export default RoomDetailsCard;