import React, {useState, useEffect} from "react";
import BookingCard from "../BookingDashboard/BookingCard";
import axios from 'axios';
const process = import.meta.env;

// const bookings = [
//   {
//     name: "Wade Warren",
//     room: "Room A-213-5 Person",
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/5972fc6c6984e6bdea9f79330fb0f65583c2d3513176ef1d1163811f015823a0?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
//   },
//   {
//     name: "Jane Copper",
//     room: "Room B-21 3-5 Person",
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/f0560cf3cf160aa0dde499aeb9028704ee2ae2a9bb88c4aa1830999669cec4b4?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
//   },
//   {
//     name: "Smith joes",
//     room: "Room D-20 2-5 Person",
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/5cf47829cf9d60ec8e1e98c5513bd3d34696db83e776f2ea548b95ef20b3d58a?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
//   },
//   {
//     name: "Andrew Roy",
//     room: "Room D-26-2Person",
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/159a9687cee0b7c75eaa846545df6187e0c3371a1df0439b42ec69ef74e1fffa?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
//   },
// ];

function NewBooking() {

  const [latestBookings, setLatestBookings] = useState([]);

  const fetchLatestBookings = async () => {
    try{
      const response = await axios.get(`${process.VITE_HOST_URL}/api/admin/dashboard_bookings`)
      setLatestBookings(response.data);
    } catch(error) {
      console.log(error);
      alert(error);
    }
  }

  useEffect(()=>{
    fetchLatestBookings();
  }, []);

  return (
    <section className="flex flex-col rounded-none">
      {latestBookings.length > 0 && (
      <div className="flex flex-col items-start w-full pr-20 bg-white py-7 pl-7 rounded-3xl max-md:px-5 max-md:max-w-full">
        <h1 className="text-2xl font-semibold text-slate-700">New Booking</h1>
        <div className="mt-3 w-full max-w-[976px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {latestBookings.map((booking, index) => (
              <BookingCard key={index} {...booking} />
            ))}
          </div>
        </div>
      </div>
      )}
    </section>
  );
}

export default NewBooking;
