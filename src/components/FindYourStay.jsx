// import React from "react";
// import RoomCard from "./RoomCard";
// import AOS from 'aos';
// import 'aos/dist/aos.css'; 

// const roomData = [
//   { guests: 3, title: "Canvas Master Bedroom-1", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6a34769e91a68863091be7617f052d5821ca33a7ce168b444c000d98699ea839?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc" },
//   { guests: 1, title: "Cozy Corner Bedroom-2", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e633741f7d84fbe23c144855d96796e930e37292ab8c106991b7d621440e5b0e?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc" },
//   { guests: 6, title: "Stunning Stars Bedroom-4", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/caa1c9b05d0c3cf30fe36d2dc18bc3562420f3a167578643a285bcc1ccaf74f4?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc" },
//   { guests: 5, title: "Panaromic View Entire Penthouse", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/fa4245a9e93ce613cb22d5cf33b00c2025f0eda2f02d019d2b25013c9bbeb33f?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc" },
//   { guests: 4, title: "Sunset View", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
// ];

// function FindYourStay() {
//   AOS.init({
//     duration: 1400,
//   })
  
//   return (
//     <section className="flex flex-col items-center justify-center max-w-full px-8 overflow-x-hidden lg:px-28">
//       <h1 className="w-full text-4xl font-bold text-black max-md:max-w-full">
//         Find Your Perfect Stay
//       </h1>
//       <div className="w-full mt-12 bg-white max-md:mt-10 max-md:max-w-full md:pr-0">
//         <div className="flex gap-5 max-md:flex-col">
//           <div className="flex flex-col w-[29%] max-md:ml-0 max-md:w-full" data-aos="fade-right">
            
//             {roomData.slice(0, 2).map((room, index) => (
//               <RoomCard key={index} {...room} />
//             ))}
           
//           </div>
//           <div className="flex flex-col ml-5 w-[71%] max-md:ml-0 max-md:w-full">
//             <div className="grow max-md:mt-10 max-md:max-w-full">
//               <div className="flex gap-5 max-md:flex-col">
//                 <div className="flex flex-col w-[57%] max-md:ml-0 max-md:w-full" data-aos="fade-down">
//                   <RoomCard {...roomData[2]} isLarge={true} />
//                 </div>
//                 <div className="flex flex-col ml-5 w-[43%] max-md:ml-0 max-md:w-full" data-aos="fade-left">
//                   {roomData.slice(3).map((room, index) => (
//                       <RoomCard key={index} {...room} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default FindYourStay;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import RoomCard from "./RoomCard";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import axios from 'axios';
// const process = import.meta.env;

// function FindYourStay() {
//   const [rooms, setRooms] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     AOS.init({
//       duration: 1400,
//     });

//     const fetchRooms = async () => {
//       try {
//         const response = await axios.get(`${process.VITE_HOST_URL}/api/admin/get5rooms`);
//         console.log(response.data);
//         setRooms(response.data);
//       } catch (error) {
//         console.error("Error fetching rooms:", error);
//       }
//     };

//     fetchRooms();
//   }, []);

//   const handleRoomClick = (roomId) => {
//     navigate(`/room/${roomId}`);
//   };

//   return (
//     <section className="flex flex-col items-center justify-center max-w-full px-8 overflow-x-hidden lg:px-28">
//       <h1 className="w-full text-4xl font-bold text-black max-md:max-w-full">
//         Find Your Perfect Stay
//       </h1>
//       <div className="w-full mt-12 bg-white max-md:mt-10 max-md:max-w-full md:pr-0">
//         <div className="flex gap-5 max-md:flex-col">
//           <div className="flex flex-col w-[29%] max-md:ml-0 max-md:w-full" data-aos="fade-right">
//             {rooms.slice(0, 2).map((room) => (
//               <RoomCard 
//                 key={room.id} 
//                 {...room} 
//                 onClick={() => handleRoomClick(room.id)}
//               />
//             ))}
//           </div>
//           <div className="flex flex-col ml-5 w-[71%] max-md:ml-0 max-md:w-full">
//             <div className="grow max-md:mt-10 max-md:max-w-full">
//               <div className="flex gap-5 max-md:flex-col">
//                 <div className="flex flex-col w-[57%] max-md:ml-0 max-md:w-full" data-aos="fade-down">
//                   {rooms[2] && (
//                     <RoomCard 
//                       {...rooms[2]} 
//                       isLarge={true} 
//                       onClick={() => handleRoomClick(rooms[2].id)}
//                     />
//                   )}
//                 </div>
//                 <div className="flex flex-col ml-5 w-[43%] max-md:ml-0 max-md:w-full" data-aos="fade-left">
//                   {rooms.slice(3).map((room) => (
//                     <RoomCard 
//                       key={room.id} 
//                       {...room} 
//                       onClick={() => handleRoomClick(room.id)}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default FindYourStay;


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
    <section className="flex flex-col items-center justify-center max-w-full px-8 overflow-x-hidden lg:px-28">
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