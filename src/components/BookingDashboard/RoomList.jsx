import React, { useEffect, useState } from 'react';
import RoomCard from './AdminRoomCard';
import axios from 'axios'
const process = import.meta.env;


// const roomData = [
//   { title: "Deluxe Room", occupancy: 2, total: 30, price: 5468, deals: 2, iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/75555d7b9658ef0715c7c826a6c24560af0f9d5e17c18395c1eccbf5bd050f80?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7" },
//   { title: "Room with View", occupancy: 2, total: 35, price: 7168, deals: 2, iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/75555d7b9658ef0715c7c826a6c24560af0f9d5e17c18395c1eccbf5bd050f80?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7" },
//   { title: "Penthouse", occupancy: 2, total: 25, price: 6568, deals: null, iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/75555d7b9658ef0715c7c826a6c24560af0f9d5e17c18395c1eccbf5bd050f80?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7" },
//   { title: "VIP Suit", occupancy: 4, total: 10, price: 9568, deals: null, iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/75555d7b9658ef0715c7c826a6c24560af0f9d5e17c18395c1eccbf5bd050f80?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7" },
//   { title: "Superior", occupancy: 4, total: 10, price: 2568, deals: null, iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/75555d7b9658ef0715c7c826a6c24560af0f9d5e17c18395c1eccbf5bd050f80?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7" }
// ];


const RoomList = () => {
  const [roomData, setRoomData] = useState([]);


const getRoomData = async () => {
  try{
  const response = await axios.get(`${process.VITE_HOST_URL}/api/admin/rooms`);
  console.log(response);
  setRoomData(response.data);

} catch(error) {
  console.log(error);
  alert(error);
}
}

useEffect(() => {
  getRoomData();
}, []);
  return (
    <section className="flex flex-col px-6 py-5 pl-4 bg-white rounded-3xl">
      <h2 className="self-start text-2xl font-semibold text-slate-700">Room</h2>
      <div className="flex flex-wrap gap-8 mt-5">
        {roomData.map((room, index) => (
          <RoomCard key={index} {...room} />
        ))}
      </div>
    </section>
  );
};

export default RoomList;