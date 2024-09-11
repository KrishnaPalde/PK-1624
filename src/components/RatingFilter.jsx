import React, { useState } from "react";
import FilterHeader from "./FilterHeader";
import { Star } from 'lucide-react';

function RatingFilter({ selectedRating, setSelectedRating }) {
  const ratings = ["0+", "1+", "2+", "3+", "4+"];
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <FilterHeader title="Rating" isExpanded={isExpanded} onClick={toggleExpand} />
      <div
        className={`flex flex-col gap-4 mt-4 transition-max-height duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-46" : "max-h-0"
        }`}
      >
        <div className="flex flex-col space-y-3">
          {ratings.map((rating, index) => (
            <label
              key={index}
              className="flex items-center gap-3 transition-transform cursor-pointer text-neutral-900 hover:scale-95"
            >
              <input
                type="radio"
                className="sr-only" 
                checked={selectedRating === index}
                onChange={() => setSelectedRating(index)}
              />
              <Star
                className={`w-4 h-4 ${
                  selectedRating === index 
                    ? 'text-[#335064] fill-[#335064]' 
                    : 'text-gray-300'
                }`}
              />
              <span className={`${selectedRating === index ? 'font-bold' : ''}`}>
                {rating} Stars
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RatingFilter;