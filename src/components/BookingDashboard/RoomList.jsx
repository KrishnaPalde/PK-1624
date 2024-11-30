import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import RoomCard from './AdminRoomCard';
import axios from 'axios';
const process = import.meta.env;

const RoomList = () => {
  const [roomData, setRoomData] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  const getRoomData = async () => {
    try {
      const response = await axios.get(`${process.VITE_HOST_URL}/api/allRooms`);
      console.log(response);
      setRoomData(response.data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    getRoomData();
  }, []);

  const handleRoomClick = (room) => {
    navigate(`/admin/room`, { state: { room } }); // Pass room data as state
  };

  return (
    <section className="flex flex-col px-6 py-5 pl-4 bg-white rounded-3xl">
      <h2 className="self-start text-2xl font-semibold text-slate-700">Room</h2>
      <div className="flex flex-wrap gap-8 mt-5">
        {roomData.map((room, index) => (
          <div
            key={index}
            onClick={() => handleRoomClick(room)}
            className="cursor-pointer"
          >
            <RoomCard {...room} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoomList;
