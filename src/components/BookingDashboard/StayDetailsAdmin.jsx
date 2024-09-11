import React from "react";
import { IoPeopleSharp } from "react-icons/io5";
import { HiMiniHomeModern } from "react-icons/hi2";

function formatDate(dateString) {
  const date = new Date(dateString);
  
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  
  return formattedDate.replace(/(\s0)/, ' ');
}

function StayDetailsAdmin({ bookingDetails, roomDetails }) {
  if (!bookingDetails) return null;
  const lastFourChars = bookingDetails?.bookingId ? bookingDetails.bookingId.slice(-4) : '';
  const checkInDate = formatDate(bookingDetails.checkInDate);
  const checkOutDate = formatDate(bookingDetails.checkOutDate);

  const getTitle = () => {
    switch (Math.round(roomDetails.rating)) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Average";
      case 4:
        return "Good";
      case 5:
        return "Excellent";
      default:
        return "Unknown"; 
    }
  };
  
  return (
    <article className="flex overflow-hidden flex-col p-6 bg-white rounded-3xl max-w-[500px] max-md:px-5">
      <div className="flex flex-wrap w-full gap-6 text-neutral-900 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/367030233600d0ef3fa44e636606b99253341bdcd384026a6c672cc2cc21a9f9?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
          alt="Hotel room"
          className="object-contain shrink-0 my-auto rounded-xl aspect-[1.01] min-h-[120px] w-[121px]"
        />
        <div className="flex flex-col justify-center min-w-[240px] w-[304px]">
          <div className="flex flex-col w-full">
            <div className="text-base font-medium opacity-75">
              Tranquil Trails
            </div>
            <div className="mt-1 text-xl font-semibold">
              {/* Superior room - 1 double bed or 2 twin beds */}
              {roomDetails.title}
            </div>
          </div>
          <div className="flex items-center w-full gap-2 mt-4 text-xs font-medium">
            <div className="flex flex-col self-stretch w-10 my-auto whitespace-nowrap">
              <div className="gap-1 self-stretch px-3 py-2.5 w-full rounded border border-[#335064]  border-solid min-h-[32px]">
                {roomDetails.rating}
              </div>
            </div>
            <div className="self-stretch my-auto">
              <span className="font-bold">{getTitle()}</span> 54 reviews
            </div>
          </div>
        </div>
      </div>
      <h2 className="mt-4 text-2xl font-bold text-zinc-800">Current Booking</h2>
      <hr className="mt-4 w-full bg-neutral-900 bg-opacity-30 min-h-[1px] max-md:max-w-full" />
      <p className="mt-4 text-xs font-medium opacity-75 text-neutral-900 max-md:max-w-full">
        {/* Unwind in comfort with a plush king bed and a private balcony
        overlooking the city. */}
        {roomDetails.description}
      </p>
      <div className="self-start px-2 py-0.5 mt-4 text-xs text-center text-blue-500 whitespace-nowrap bg-indigo-50 rounded-2xl">
        Booked
      </div>
      <p className="mt-4 text-sm font-bold leading-loose text-black">
        Booking Id #{lastFourChars}
      </p>
      <div className="flex items-center justify-center gap-1.5 py-2 mt-4 max-w-full text-sm font-bold leading-loose text-black w-[156px]">
        {/* <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b2da9a0c958068cba6b202a29769ac0cd1dbeb5a7d0d90db5824ac26f87002c?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
          alt=""
          className="object-contain w-4 shrink-0 aspect-square"
        /> */}
        <IoPeopleSharp className="w-4 h-4"/>
        <div className="grow shrink my-auto w-[131px]">{bookingDetails.numberOfAdults} adults, {bookingDetails.numberOfChildren} children</div>
      </div>
      <div className="flex flex-wrap items-center justify-between w-full gap-10 mt-4 max-md:max-w-full">
        <div className="flex flex-col self-stretch justify-center my-auto text-neutral-900">
          <div className="gap-2 text-base font-semibold">{checkInDate}</div>
          <div className="flex items-start self-start gap-2 mt-2 text-xs font-medium whitespace-nowrap">
            <div className="opacity-60">Check-In</div>
          </div>
        </div>
        <div className="flex flex-row items-center self-stretch justify-between my-auto ">
            <div className="rotate-[-1.5707963267948966rad]">
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4" cy="12" r="3" fill="#335064" />
      <line x1="7" y1="12" x2="24" y2="12" stroke="#335064" strokeWidth="2" />
    </svg>    
            </div>
            <HiMiniHomeModern className="w-8 h-8 mx-4 text-[#335064]"/>
            <div className="rotate-[-1.5707963267948966rad]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="20" cy="12" r="3" fill="#335064" />
  <line x1="0" y1="12" x2="17" y2="12" stroke="#335064" strokeWidth="2" />
</svg>        
            </div>

          </div>
        <div className="flex flex-col self-stretch justify-center my-auto text-neutral-900">
          <div className="gap-2 text-base font-semibold">{checkOutDate}</div>
          <div className="flex items-start self-start gap-2 mt-2 text-xs font-medium whitespace-nowrap">
            <div className="opacity-60">Check-Out</div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default StayDetailsAdmin;