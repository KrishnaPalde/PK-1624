import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomCard from "./RoomCard";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
const process = import.meta.env;

function FindYourStay() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const isWeekend = () => {
    const today = new Date();
    return today.getDay() === 0 || today.getDay() === 6;
  };

  useEffect(() => {
    AOS.init({
      duration: 1400,
    });

    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${process.VITE_HOST_URL}/api/admin/get5rooms`);  
        setRooms(response.data.map(room => ({
          ...room,
          price: isWeekend() && room.weekend ? room.weekend : room.price,
          weekdayPrice: room.price,
          weekendPrice: room.weekend,
          isWeekend: isWeekend()
        })));
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleRoomClick = (room) => {
    navigate(`/room/${room.id}`, { state: room });
  };

  return (
    <section className="flex flex-col items-center justify-center max-w-[1323px] px-8 mx-auto overflow-x-hidden">
      <h1 className="w-full text-4xl font-bold text-black max-md:max-w-full">
        Find Your Perfect Stay
      </h1>
      <div className="w-full mt-12 bg-white max-md:mt-10 max-md:max-w-full md:pr-0">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[29%] max-md:ml-0 max-md:w-full" data-aos="fade-right">
            {rooms.slice(0, 2).map((room) => (
              <RoomCard 
                key={room.id} 
                guests={room.guests}
                title={room.title}
                name={room.name}
                image={room.images[0]}  
                price={room.price}
                onClick={() => handleRoomClick(room)}
              />
            ))}
          </div>
          <div className="flex flex-col ml-5 w-[71%] max-md:ml-0 max-md:w-full">
            <div className="grow max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-[57%] max-md:ml-0 max-md:w-full" data-aos="fade-down">
                  {rooms[2] && (
                    <RoomCard 
                      {...rooms[2]} 
                      image={rooms[2].images[0]}  
                      isLarge={true} 
                      onClick={() => handleRoomClick(rooms[2])}
                    />
                  )}
                </div>
                <div className="flex flex-col ml-5 w-[43%] max-md:ml-0 max-md:w-full" data-aos="fade-left">
                  {rooms.slice(3).map((room) => (
                    <RoomCard 
                      key={room.id} 
                      {...room} 
                      image={room.images[0]}  
                      onClick={() => handleRoomClick(room)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FindYourStay;