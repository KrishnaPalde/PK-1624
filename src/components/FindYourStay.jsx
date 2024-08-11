import React from "react";
import RoomCard from "./RoomCard";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const roomData = [
  { guests: 3, title: "Room with View", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6a34769e91a68863091be7617f052d5821ca33a7ce168b444c000d98699ea839?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc" },
  { guests: 1, title: "Small Room", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e633741f7d84fbe23c144855d96796e930e37292ab8c106991b7d621440e5b0e?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc" },
  { guests: 6, title: "Luxury Room", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/caa1c9b05d0c3cf30fe36d2dc18bc3562420f3a167578643a285bcc1ccaf74f4?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc" },
  { guests: 5, title: "Appartment", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/fa4245a9e93ce613cb22d5cf33b00c2025f0eda2f02d019d2b25013c9bbeb33f?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc" },
  { guests: 4, title: "Medium Room", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/2d0186fb8996d2da6ca0c8423928fa8392dc5e196e07f214910247d0106328b2?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc" }
];

function FindYourStay() {
  AOS.init({
    duration: 1400,
  })
  
  return (
    <section className="flex flex-col items-center justify-center max-w-full px-8 overflow-x-hidden lg:px-28">
      <h1 className="w-full text-4xl font-bold text-black max-md:max-w-full">
        Find Your Perfect Stay
      </h1>
      <div className="w-full mt-12 bg-white max-md:mt-10 max-md:max-w-full md:pr-0">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[29%] max-md:ml-0 max-md:w-full" data-aos="fade-right">
            {roomData.slice(0, 2).map((room, index) => (
              <RoomCard key={index} {...room} />
            ))}
          </div>
          <div className="flex flex-col ml-5 w-[71%] max-md:ml-0 max-md:w-full">
            <div className="grow max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-[57%] max-md:ml-0 max-md:w-full" data-aos="fade-down">
                  <RoomCard {...roomData[2]} isLarge={true} />
                </div>
                <div className="flex flex-col ml-5 w-[43%] max-md:ml-0 max-md:w-full" data-aos="fade-left">
                  {roomData.slice(3).map((room, index) => (
                    <RoomCard key={index} {...room} />
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

