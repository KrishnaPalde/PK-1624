import React from "react";
import { Link } from "react-router-dom";
import sunset4 from "../assets/Sunset4.jpg";
import guest1 from "../assets/guest1.jpg";
import guest2 from "../assets/guest2.jpg";

const QuoteCard = ({ quote, author }) => (
  <div className="flex flex-col justify-center p-6 bg-[#255d69] rounded-2xl 
    w-full h-full transform transition-all duration-300 hover:scale-[1.01]
    shadow-lg hover:shadow-xl">
    <div className="mb-6">
      <svg 
        className="w-8 h-8 text-[#eea55f] opacity-80" 
        fill="currentColor" 
        viewBox="0 0 32 32"
      >
        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
      </svg>
    </div>
    <p className="mb-4 text-lg font-medium leading-relaxed text-white sm:text-xl lg:text-2xl">
      {quote}
    </p>
    <footer className="text-sm sm:text-base text-[#eea55f] font-semibold">
      — {author}
    </footer>
  </div>
);

const GuestCard = ({ src, alt }) => (
  <div className="relative w-full h-full overflow-hidden rounded-2xl 
    transform transition-all duration-300 hover:scale-[1.01] 
    shadow-lg hover:shadow-xl group">
    <div className="relative w-full pb-[100%]">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 transition-opacity duration-300 bg-black opacity-0 group-hover:opacity-20" 
      />
    </div>
  </div>
);

const ExploreGuestRooms = () => {
  const images = [
    {
      src: guest1,
      alt: "Guest room image 1",
    },
    {
      src: guest2,
      alt: "Guest room image 2",
    },
    {
      src: sunset4,
      alt: "Guest room image 3",
    },
  ];

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 py-8 sm:py-10 lg:py-12">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 lg:mb-9">
          <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl text-zinc-800">
            Explore Our Guest Rooms
          </h1>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5748f9ac727d8c94445b4c38b48c353cceb1d2f9db7483a5c3ca6e4654ce8834?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
            className="w-16 sm:w-20 lg:w-[83px] aspect-[1.89]"
            alt="Decorative flower"
          />
        </header>
        
        {/* Main Content */}
        <Link to="/bookings" className="block">
          <main className="mt-9 w-full max-w-[1240px] max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              {/* Left Column */}
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
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col w-6/12 ml-5 max-md:ml-0 max-md:w-full">
                <div className="grow max-md:mt-8 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col">
                    <GuestCard
                      src={images[1].src}
                      alt={images[1].alt}
                    />
                    <GuestCard
                      src={images[2].src}
                      alt={images[2].alt}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </Link>
      </div>
    </section>
  );
};

export default ExploreGuestRooms;