// import React, { useState,useEffect } from "react";
// import SortingHeader from "./SortingHeader";
// import { useLocation } from "react-router-dom";
// import HotelCard from "./HotelCard";
// import { motion, AnimatePresence } from "framer-motion";

// const hotelData = [
//   {
//     id: 1,
//     images: [
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/ff1bb4311ab6ad009abe7ad8c9e871d14a2a8e21c1cdd08b6ae105fc6a687c83?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/9f3cdeab16e49f9cec231a84a42f0972b0c6c1bc70d181edd307d7320ef5beaa?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/a37211c28699cf564db19637acf3b143a5620933b485da9c00470d4f5d7fe59d?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/45a1d013ac4a596035892d3f4e5ded4b02158f373721d9b78dc290cb95f3b93c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/3a18a673558ec4550e67a47a311f9b6ef914fa8e3d0cab17a113a2fc8b42f7eb?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
//     ],
//     imageCount: 5,
//     title: "Deluxe Room",
//     description: "Unwind in comfort with a plush king bed and a private balcony overlooking the city.",
//     guestCount: 2,
//     rating: 5,
//     price: 180,
//   },
//   {
//     id: 2,
//     images: [
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/e2672af5ab8b4e4d5014239192c995f67315f454513885dddc9ee8466013abe5?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
//     ],
//     imageCount: 1,
//     title: "Deluxe Room",
//     description: "Unwind in comfort with a plush king bed and a private balcony overlooking the city.",
//     guestCount: 2,
//     rating: 5,
//     price: 190,
//   },
//   {
//     id: 3,
//     images: [
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/e2672af5ab8b4e4d5014239192c995f67315f454513885dddc9ee8466013abe5?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
//     ],
//     imageCount: 1,
//     title: "Deluxe Room",
//     description: "Unwind in comfort with a plush king bed and a private balcony overlooking the city.",
//     guestCount: 2,
//     rating: 5,
//     price: 190,
//   },
  
// ];

// function HotelListing() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const cardsPerPage = 3;
//   const totalPages = Math.ceil(hotelData.length / cardsPerPage);

//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   const currentCards = hotelData.slice(indexOfFirstCard, indexOfLastCard);

//   const nextPage = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   const prevPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };



//   return (
//     <main className="flex flex-col grow max-md:mt-6 max-md:max-w-full">
//       <SortingHeader totalPlaces={hotelData.length} shownPlaces={cardsPerPage} />
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentPage}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.3 }}
//         >
//           {currentCards.map((hotel) => (
//             <HotelCard 
//             key={hotel.id} 
//             {...hotel} 
//             imageUrl={hotel.images[0]} 
//             images={hotel.images} 
//           />
//           ))}
           
//         </motion.div>
//       </AnimatePresence>
//       <div className="flex items-center justify-center mt-8 space-x-4">
//         <button
//           onClick={prevPage}
//           disabled={currentPage === 1}
//           className="px-4 py-2 text-white transition-colors duration-200 rounded-lg shadow-md bg-sky-400 hover:bg-sky-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
//         >
//           Previous
//         </button>
//         <span className="text-lg font-semibold">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={nextPage}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 text-white transition-colors duration-200 rounded-lg shadow-md bg-sky-400 hover:bg-sky-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
//         >
//           Next
//         </button>
//       </div>
//     </main>
//   );
// }

// export default HotelListing;


import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SortingHeader from "./SortingHeader";
import HotelCard from "./HotelCard";
import { motion, AnimatePresence } from "framer-motion";

function HotelListing() {
  const [hotelData, setHotelData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const { checkIn, checkOut, adults, children } = location.state || {};

  const cardsPerPage = 3;

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("https://pk-1624.onrender.com/api/rooms");
        setHotelData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch room data");
        setLoading(false);
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const totalPages = Math.ceil(hotelData.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = hotelData.slice(indexOfFirstCard, indexOfLastCard);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="flex flex-col grow max-md:mt-6 max-md:max-w-full">
      {/* <SortingHeader totalPlaces={hotelData.length} shownPlaces={cardsPerPage} /> */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentCards.map((room) => (
            <HotelCard 
              key={room.id}
              id={room.id}
              imageUrl={room.images[0]}
              images={room.images}
              imageCount={room.images.length}
              title={room.title}
              description={room.description}
              guestCount={2} 
              rating={room.rating}
              price={room.price}
              // reviews={room.reviews.length}
            />
          ))}
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center justify-center mt-8 space-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white transition-colors duration-200 rounded-lg shadow-md bg-sky-400 hover:bg-sky-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white transition-colors duration-200 rounded-lg shadow-md bg-sky-400 hover:bg-sky-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </main>
  );
}

export default HotelListing;