import React from "react";
import PaymentButton from '../components/PaymentButton';
import { useNavigate,Link } from "react-router-dom";

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


  
  return (
    <article 
    className="flex flex-col mt-4 overflow-hidden bg-white rounded-lg shadow-md sm:flex-row"
  >
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
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-1 text-sm">{rating} Star</span>
        </div>
        <div className="flex items-center mt-2 ">
          <div className="flex items-center justify-center p-4 text-lg font-normal text-gray-800 border rounded font-smtext-center w-7 h-7 border-sky-400">
            <span>{rating.toFixed(1)}</span>
          </div>
          <div className="flex flex-row ml-4 space-x-1 text-sm text-gray-600">
            <p className="font-medium">Very Good</p>
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
          <Link to="/yourdetails">
          <button className="px-4 py-2 text-white rounded bg-sky-400">
            Next
          </button>
          </Link>
          
{/* <PaymentButton amount={1000} /> */}
        </div>
      </div>
    </div>
  </article>
  );
}

export default HotelCard;
