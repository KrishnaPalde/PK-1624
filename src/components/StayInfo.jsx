import React from "react";
import { useBooking } from "../contexts/BookingFormContext";

function StayInfo({title,rating,price,images}) {
  const { bookingInfo } = useBooking();

  if (!bookingInfo.checkIn) {
    return <div>No room data available. Please select booking details.</div>;
  }

  const getTitle = () => {
    switch (Math.round(rating)) {
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
    <>
      <div className="flex w-full gap-6 text-neutral-900 max-md:max-w-full">
        <img
          loading="lazy"
          src={images[0]}
          alt="Hotel room"
          className="object-contain shrink-0 my-auto rounded-xl aspect-[1.01] min-h-[120px] w-[121px]"
        />
        <div className="flex flex-col justify-center min-w-[240px] w-[304px]">
          <div className="flex flex-col w-full">
            <div className="text-base font-medium opacity-75">
            Tranquil Trails
            </div>
            <div className="mt-1 text-xl font-semibold">
              {title}
            </div>
          </div>
          <div className="flex items-center w-full gap-2 mt-4 text-xs font-medium">
            <div className="flex flex-col self-stretch w-10 my-auto whitespace-nowrap">
              <div className="gap-1 self-stretch px-3 py-2.5 w-full rounded border border-sky-400 border-solid min-h-[32px]">
                {rating}
              </div>
            </div>
            <div className="self-stretch my-auto">
              <span className="font-bold">{getTitle()}</span> 371 reviews
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full mt-4 bg-neutral-900 bg-opacity-30" />
      <p className="mt-4 text-xs font-medium opacity-75 text-neutral-900 max-md:max-w-full">
        Unwind in comfort with a plush king bed and a private balcony
        overlooking the city.
      </p>
      <div className="flex gap-1.5 py-2 mt-4 max-w-full text-sm font-bold leading-loose text-black w-[156px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fdb1d85d49e1569920ef35bfc5528c005294340ccfcfb4f3d686a17386149aff?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
          alt=""
          className="object-contain w-4 shrink-0 aspect-square"
        />
        <div className="grow shrink my-auto w-[131px]">
        {bookingInfo.adults} Adults, {bookingInfo.adults} Children
        </div>
      </div>
    </>
  );
}

export default StayInfo;
