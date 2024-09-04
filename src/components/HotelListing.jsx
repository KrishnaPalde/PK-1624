// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import SortingHeader from "./SortingHeader";
// import HotelCard from "./HotelCard";
// import { motion, AnimatePresence } from "framer-motion";

// function HotelListing({ priceRange, selectedRating }) {  // Accept the filters as props
//   const [hotelData, setHotelData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const location = useLocation();

//   const cardsPerPage = 3;

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         // const response = await axios.get("https://pk-1624.onrender.com/api/admin/rooms");
//         const response = await axios.get("http://localhost:4444/api/admin/rooms");
//         setHotelData(response.data);
//         setFilteredData(response.data);  // Initialize filtered data with all hotels
//         setLoading(false);
//       } catch (error) {
//         setError("Failed to fetch room data");
//         setLoading(false);
//         console.error("Error fetching rooms:", error);
//       }
//     };

//     fetchRooms();
//   }, []);

//   useEffect(() => {
//     const applyFilters = () => {
//       const filtered = hotelData.filter((hotel) => {
//         return (
//           hotel.price >= priceRange[0] &&
//           hotel.price <= priceRange[1] &&
//           hotel.rating >= selectedRating
//         );
//       });
//       setFilteredData(filtered);
//       setCurrentPage(1); // Reset to the first page after filtering
//     };

//     applyFilters();
//   }, [hotelData, priceRange, selectedRating]);  // Re-apply filters whenever these dependencies change

//   const totalPages = Math.ceil(filteredData.length / cardsPerPage);
//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);

//   const nextPage = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   const prevPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <main className="flex flex-col grow max-md:mt-6 max-md:max-w-full">
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentPage}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.3 }}
//         >
//           {currentCards.map((room) => (
//             <HotelCard 
//               key={room.id}
//               id={room.id}
//               imageUrl={room.images[0]}
//               images={room.images}
//               imageCount={room.images.length}
//               title={room.title}
//               description={room.description}
//               guestCount={2} 
//               rating={room.rating}
//               price={room.price}
//             />
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

function HotelListing({ priceRange, selectedRating, testMode = false }) {
  const [hotelData, setHotelData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const process = import.meta.env;

  const cardsPerPage = 3;

    const isWeekend = () => {
    const today = new Date();
    return today.getDay() === 0 || today.getDay() === 6; 
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // const response = await axios.get("http://localhost:4444/api/admin/rooms");
        const response = await axios.get(`${process.VITE_HOST_URL}/api/admin/rooms`);
        
        setHotelData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch room data");
        setLoading(false);
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  // useEffect(() => {
  //   const fetchRooms = async () => {
  //     if (testMode) {
  //      
  //       setTimeout(() => {
  //         setLoading(false);
  //         setHotelData([/* mock data here */]);
  //         setFilteredData([/* mock data here */]);
  //       }, 3000);
  //     } else {
  //       try {
  //         const response = await axios.get(`${process.VITE_HOST_URL}/api/admin/rooms`);
  //         setHotelData(response.data);
  //         setFilteredData(response.data);
  //         setLoading(false);
  //       } catch (error) {
  //         setError("Failed to fetch room data");
  //         setLoading(false);
  //         console.error("Error fetching rooms:", error);
  //       }
  //     }
  //   };

  //   fetchRooms();
  // }, [testMode]);


  useEffect(() => {
    const applyFilters = () => {
      const filtered = hotelData.filter((hotel) => {
        const currentPrice = isWeekend() && hotel.weekend ? hotel.weekend : hotel.price;
        return (
          currentPrice >= priceRange[0] &&
          currentPrice <= priceRange[1] &&
          hotel.rating >= selectedRating
        );
      });
      setFilteredData(filtered);
      setCurrentPage(1);
    };

    applyFilters();
  }, [hotelData, priceRange, selectedRating]);

  const totalPages = Math.ceil(filteredData.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-100">
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-24 h-24 border-t-4 border-b-4 border-blue-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="text-xl font-semibold text-gray-700"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Loading Hotels
          </motion.div>
          <motion.div
            className="flex space-x-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-blue-500 rounded-full"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // const LoadingAnimation = () => (
  //   <div className="flex items-center justify-center w-full h-screen ">
  //     <motion.div
  //       className="flex flex-col items-center space-y-4"
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       transition={{ duration: 0.5 }}
  //     >
  //       <motion.div
  //         className="w-24 h-24 border-t-4 border-b-4 border-blue-500 rounded-full"
  //         animate={{ rotate: 360 }}
  //         transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
  //       />
  //       <motion.div
  //         className="text-xl font-semibold text-gray-700"
  //         initial={{ y: -20 }}
  //         animate={{ y: 0 }}
  //         transition={{ duration: 0.5, delay: 0.2 }}
  //       >
  //         Loading Hotels
  //       </motion.div>
  //       <motion.div
  //         className="flex space-x-2"
  //         initial={{ scale: 0 }}
  //         animate={{ scale: 1 }}
  //         transition={{ duration: 0.5, delay: 0.4 }}
  //       >
  //         {[0, 1, 2].map((index) => (
  //           <motion.div
  //             key={index}
  //             className="w-3 h-3 bg-blue-500 rounded-full"
  //             animate={{
  //               y: [0, -10, 0],
  //             }}
  //             transition={{
  //               duration: 0.6,
  //               repeat: Infinity,
  //               delay: index * 0.2,
  //             }}
  //           />
  //         ))}
  //       </motion.div>
  //     </motion.div>
  //   </div>
  // );

  // if (loading) {
  //   return <LoadingAnimation />;
  // }

  if (error) {
    return <div className="mt-8 text-xl text-center text-red-500">{error}</div>;
  }

  return (
    <main className="flex flex-col grow max-md:mt-6 max-md:max-w-full">
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
              price={isWeekend() && room.weekend ? room.weekend : room.price}
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