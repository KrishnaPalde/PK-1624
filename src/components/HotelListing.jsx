import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useBooking } from "../contexts/BookingFormContext";
import HotelCard from "./HotelCard";
import { motion, AnimatePresence } from "framer-motion";

function HotelListing({ priceRange, selectedRating, testMode = false }) {
  const [hotelData, setHotelData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { bookingInfo } = useBooking();
  const guestCount = (bookingInfo.adults || 0) + (bookingInfo.children || 0);
  const location = useLocation();
  const navigate = useNavigate();
  const process = import.meta.env;

  const cardsPerPage = 5;
  const GUEST_LIMIT_PER_ROOM = 3;

  const isWeekend = () => {
    const today = new Date();
    return today.getDay() === 0 || today.getDay() === 6;
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        console.log(bookingInfo.checkIn.toISOString() + " " + bookingInfo.checkOut.toISOString());
        // const response = await axios.get(
        //   `${process.env.VITE_HOST_URL}/api/admin/rooms`,
        //   {
        //     params: {
        //       checkIn: bookingInfo.checkIn.toISOString(), 
        //       checkOut: bookingInfo.checkOut.toISOString(),
        //     },
        //   }
        // );
        const response = await axios.get(`${process.VITE_HOST_URL}/api/admin/rooms`, {
          params: {
            checkinDate: bookingInfo.checkIn.toISOString(),
            checkoutDate: bookingInfo.checkOut.toISOString(),
          },
        });
        
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

  useEffect(() => {
    const applyFilters = () => {
      const filtered = hotelData.filter((hotel) => {
        const currentPrice =
          isWeekend() && hotel.weekend ? hotel.weekend : hotel.price;
        return (
          currentPrice >= priceRange[0] &&
          currentPrice <= priceRange[1] &&
          hotel.rating >= selectedRating
        );
      });
      setFilteredData(filtered);
      setCurrentPage(1);


    // Check if no rooms are available
    if (filtered.length === 0) {
      setError("No rooms available for the selected dates.");
    } else {
      setError("");
    }
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

  const calculateRequiredRooms = () => {
    if (guestCount <= GUEST_LIMIT_PER_ROOM && bookingInfo.rooms == 1) return 1;
    if(bookingInfo.rooms > 1) return bookingInfo.rooms;
    return Math.ceil(guestCount / GUEST_LIMIT_PER_ROOM);
  };

  const requiredRooms = calculateRequiredRooms();
  
  const handleRoomSelection = (room, index) => {
    if (filteredData.length === 0) return;
    if (index === filteredData.length - 1) {
      if (selectedRooms.includes(room)) {
        setSelectedRooms(selectedRooms.filter((selectedRoom) => selectedRoom !== room));
      } else if (guestCount <= GUEST_LIMIT_PER_ROOM && bookingInfo.rooms == 1) {
        setSelectedRooms([room]);
      } else {
        setSelectedRooms([...selectedRooms, room]);
      }
      return;
    }

    if (guestCount <= GUEST_LIMIT_PER_ROOM && bookingInfo.rooms == 1) {
      setSelectedRooms([room]);
    } else {
      if (selectedRooms.includes(room)) {
        setSelectedRooms(selectedRooms.filter((selectedRoom) => selectedRoom !== room));
      } else if (selectedRooms.length < requiredRooms) {
        setSelectedRooms([...selectedRooms, room]);
      }
    }
  };


  const handleNextClick = (room) => {
    let roomsToNavigate;
    if (guestCount <= GUEST_LIMIT_PER_ROOM && bookingInfo.rooms == 1) {
      roomsToNavigate = [room];
    } else {
      roomsToNavigate = selectedRooms.length > 0 ? selectedRooms : [room];
    }
    
    const serializableRooms = roomsToNavigate.map(room => ({
      id: room.id,
      title: room.title,
      name: room.name,
      description: room.description,
      images: room.images,
      rating: room.rating,
      price: isWeekend() && room.weekend ? room.weekend : room.price,
      weekend: room.weekend,
      totalReviews: room.totalReviews,
      type: room.type 
    }));
  
    navigate(`/room/${room.id}/details`, { state: { selectedRooms: serializableRooms } });
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
            Loading Rooms
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
          className="space-y-8"
        >
          {currentCards.map((room, index) => (
            <HotelCard
              key={room.id}
              id={room.id}
              imageUrl={room.images[0]}
              images={room.images}
              imageCount={room.images.length}
              title={room.title}
              name={room.name}
              description={room.description}
              guestCount={index === currentCards.length - 1 ? null : GUEST_LIMIT_PER_ROOM}
              rating={room.rating}
              totalReviews={room.totalReviews}
              price={isWeekend() && room.weekend ? room.weekend : room.price}
              weekdayPrice={room.price}
              weekendPrice={room.weekend}
              isWeekend={isWeekend()}
              onSelect={() => handleRoomSelection(room, index)}
              onNext={handleNextClick}
              isSelected={selectedRooms.includes(room)}
              isLastSelected={
                selectedRooms.length > 0 &&
                selectedRooms[selectedRooms.length - 1] === room
              }
              room={room}
              roomCount={requiredRooms}
              isLastRoom={index === currentCards.length - 1}
              disabled={
                index !== currentCards.length - 1 && 
                ((guestCount > GUEST_LIMIT_PER_ROOM && 
                  selectedRooms.length == requiredRooms && 
                  !selectedRooms.includes(room)) 
                  ||
                (guestCount <= GUEST_LIMIT_PER_ROOM && 
                  selectedRooms.length === requiredRooms && 
                  !selectedRooms.includes(room)))
              }
              selectedRooms={selectedRooms}
            />
          ))}
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center justify-center mt-8 space-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white transition-colors duration-200 bg-[#255d69] hover:bg-[#243947] rounded-lg shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          // disabled={selectedRooms.length !== roomCount}
          className="px-4 py-2 text-white transition-colors duration-200 bg-[#255d69] hover:bg-[#243947] rounded-lg shadow-md  disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      {selectedRooms.length > 0 && (guestCount > GUEST_LIMIT_PER_ROOM || selectedRooms.length <= requiredRooms) && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg"
        >
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center space-x-4">
              {selectedRooms.map((room) => (
                <div
                  key={room.id}
                  className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full"
                >
                  {room.name}
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-600">
                {selectedRooms.length} of {requiredRooms} rooms selected
              </span>
              <button
                onClick={() =>
                  handleNextClick(selectedRooms[selectedRooms.length - 1])
                }
                disabled={selectedRooms.length !== requiredRooms}
                className={`px-6 py-2 text-white transition-colors duration-300 rounded-full ${
                  selectedRooms.length === requiredRooms
                    ? "bg-[#255d69] hover:bg-[#243947]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </main>
  );
}

export default HotelListing;
