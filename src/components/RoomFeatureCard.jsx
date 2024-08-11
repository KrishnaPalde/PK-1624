import React from "react";

function RoomFeatureCard({ icon, text }) {
  return (
    <div className="flex gap-2.5 py-4 pr-16 pl-4 w-40 text-base font-medium rounded-xl min-h-[125px] text-neutral-900 max-md:pr-5">
      <div className="flex flex-row justify-between">
        <img
          loading="lazy"
          src={icon}
          alt=""
          className="object-contain w-8 aspect-square"
        />
        <div className="mt-16 max-md:mt-10">{text}</div>
      </div>
    </div>
  );
}

export default RoomFeatureCard;
