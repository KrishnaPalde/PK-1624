import React from "react";

function BookingCard({ name, room, image }) {
  return (
    <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow justify-center items-center py-11 w-full bg-white rounded-xl border border-solid border-blue-500 border-opacity-50 min-h-[267px] shadow-[0px_8px_12px_rgba(47,131,255,0.1)] max-md:mt-5">
        <img
          loading="lazy"
          src={image}
          alt={`Profile picture of ${name}`}
          className="object-contain rounded-full aspect-square w-[90px]"
        />
        <h2 className="mt-5 text-2xl font-bold leading-none text-stone-500">
          {name}
        </h2>
        <p className="mt-5 text-lg leading-normal text-center text-neutral-400">
          {room}
        </p>
      </div>
    </div>
  );
}

export default BookingCard;
