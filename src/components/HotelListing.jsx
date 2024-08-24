import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SortingHeader from "./SortingHeader";
import HotelCard from "./HotelCard";
import { motion, AnimatePresence } from "framer-motion";

function HotelListing({ priceRange, selectedRating }) {  // Accept the filters as props
  const [hotelData, setHotelData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();

  const cardsPerPage = 3;

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // const response = await axios.get("https://pk-1624.onrender.com/api/rooms");
        const response = await axios.get("http://localhost:4444/api/rooms");
        setHotelData(response.data);
        setFilteredData(response.data);  // Initialize filtered data with all hotels
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch room data");
        setLoading(false);
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = hotelData.filter((hotel) => {
        return (
          hotel.price >= priceRange[0] &&
          hotel.price <= priceRange[1] &&
          hotel.rating >= selectedRating
        );
      });
      setFilteredData(filtered);
      setCurrentPage(1); // Reset to the first page after filtering
    };

    applyFilters();
  }, [hotelData, priceRange, selectedRating]);  // Re-apply filters whenever these dependencies change

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
              price={room.price}
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
