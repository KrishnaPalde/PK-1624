import React from "react";
import { FaStar } from "react-icons/fa"; // Import star icon

const StarRating = ({ rating  }) => {

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              className="hidden"
            />
            <FaStar
              className="cursor-pointer"
              size={30}
              color="#ffc107"
            />
          </label>
        );
      })}
    </div>
  );
};


function TestimonialCard({ name, comments, overallExperience }) {
  return (
    <div
      className={`flex flex-col px-10 py-9 w-full bg-sky-100 border border-solid border-zinc-200 rounded-[32px] max-md:px-5 max-md:mt-6`}
    >
      <div className="flex items-start justify-between w-full gap-5 pb-6 border-b border-zinc-200">
        <div className="flex self-start gap-3 text-black">
          {/* <img
            loading="lazy"
            src={imageSrc}
            alt={name}
            className="shrink-0 w-16 aspect-square rounded-[32px]"
          /> */}
          <div className="flex flex-col my-auto">
            <div className="text-lg font-bold">{name}</div>
            {/* <div className="mt-3.5 text-sm font-medium">{location}</div> */}
          </div>
        </div>
        <div className="flex gap-0.5 self-end mt-11 max-md:mt-10">
          <StarRating  rating={overallExperience} />
        </div>
      </div>
      <p className="text-sm leading-6 mt-9 text-neutral-500">{comments}</p>
    </div>
  );
}

export default TestimonialCard;
