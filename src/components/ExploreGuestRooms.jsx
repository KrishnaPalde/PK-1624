import React from "react";
import QuoteCard from "./QuoteCard";
import GuestCard from "./GuestCard";
import { Link } from "react-router-dom";
import sunset4 from "../assets/Sunset4.jpg";
import guest1 from "../assets/guest1.jpg";
import guest2 from "../assets/guest2.jpg";

const ExploreGuestRooms = () => {
  const images = [
    {
      // src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a9c642f5a39a60fc86bfeb82e09551ed23c47f35ef4ea5de69a1f07b5dd9f4b2?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
      src: guest1,
      alt: "Guest room image 1",
    },
    {
      // src: "https://cdn.builder.io/api/v1/image/assets/TEMP/dfe6ebef0b4a9a9a658f251f74f1ab676dbd978f48e741d4d3bbf30dbc5d224d?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
      src: guest2,
      alt: "Guest room image 2",
    },
    {
      // src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d15c067a2a2bb58bc5f125c24be11998a9414f4eb6a71e01e25af5d3ec71831e?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
      src: sunset4,
      alt: "Guest room image 3",
    },
  ];

  return (
    <section className="flex flex-col items-center px-20 py-12 bg-white max-md:px-5">
      <header className="flex gap-5 justify-between pr-11 max-w-full text-4xl font-bold text-zinc-800 w-[1240px] max-md:flex-wrap max-md:pr-5">
        <h1 className="max-md:max-w-full">Explore Our Guest Rooms</h1>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5748f9ac727d8c94445b4c38b48c353cceb1d2f9db7483a5c3ca6e4654ce8834?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
          className="shrink-0 aspect-[1.89] w-[83px]"
          alt=""
        />
      </header>
      
      <Link to='/bookings'>
      <main className="mt-9 w-full max-w-[1240px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="grow max-md:mt-8 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                <QuoteCard
                  quote="The best apartment service in Dehradhun, really liked it.."
                  author="Najwa Shihab"
                />
                <GuestCard
                  src={images[0].src}
                  alt={images[0].alt}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-6/12 ml-5 max-md:ml-0 max-md:w-full">
            <div className="grow max-md:mt-8 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                <GuestCard
                  src={images[1].src}
                  alt={images[1].alt}
                  className="w-full h-auto"
                />
                <GuestCard
                  src={images[2].src}
                  alt={images[2].alt}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      </Link>
    </section>
  );
};

export default ExploreGuestRooms;
