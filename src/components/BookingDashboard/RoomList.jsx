import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomCard from './AdminRoomCard';
import axios from 'axios';
const process = import.meta.env;

const RoomList = () => {
  const [roomData, setRoomData] = useState([]);
  const navigate = useNavigate();

  const getRoomData = async () => {
    try {
      const response = await axios.get(`${process.VITE_HOST_URL}/api/allRooms`);
      setRoomData(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      alert("Failed to load rooms");
    }
  };

  useEffect(() => {
    getRoomData();
  }, []);

  const handleRoomClick = (room) => {
    navigate(`/admin/room`, { state: { room } });
  };

  const handleShowAllClick = () => {
    navigate(`/admin/room`);
  };

  const roomsToDisplay = roomData.slice(0, 5); // Show only first 4

  return (
    <section className="flex flex-col px-6 py-5 pl-4 bg-white rounded-3xl">
      <h2 className="self-start text-2xl font-semibold text-slate-700">Rooms</h2>
      
     <div className="flex flex-wrap gap-8 mt-5">
  {roomsToDisplay.map((room, index) => (
    <div
      key={index}
      onClick={() => handleRoomClick(room)}
      className="cursor-pointer"
    >
      <RoomCard {...room} />
    </div>
  ))}

  {roomData.length > 5 && (
    <div
  onClick={handleShowAllClick}
  className="cursor-pointer flex flex-col justify-center items-center p-4 text-center bg-[#E6F2F3] hover:bg-[#D1E6E7] transition-all rounded-lg border border-[#A3C9CB] shadow-sm min-h-[150px] w-[150px]"
>
  <div className="text-[#1F5B61] text-3xl mb-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </div>
  <p className="text-[#1F5B61] font-semibold text-sm">Show All Rooms</p>
</div>

  )}
</div>

    </section>
  );
};

export default RoomList;
