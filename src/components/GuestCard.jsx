import React from "react";

const GuestCard = ({ src, alt }) => {
  return (
    <div className="flex flex-col w-full max-md:ml-0">
      <div className="flex flex-col py-8 grow">
        <img
          loading="lazy"
          src={src}
          alt={alt}
          className="w-full shadow-lg aspect-[1.33]  rounded-lg"
        />
      </div>
    </div>
  );
};

export default GuestCard;
