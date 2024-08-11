import React, { useState } from "react";
import FilterHeader from "./FilterHeader";

function RatingFilter() {
  const ratings = ["0+", "1+", "2+", "3+", "4+"];
  const [selectedRating, setSelectedRating] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <FilterHeader title="Rating" isExpanded={isExpanded} onClick={toggleExpand} />
      <div
        className={`flex flex-col gap-4 mt-4 transition-max-height duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="flex gap-4 pr-20 text-xs font-medium whitespace-nowrap text-neutral-900 max-md:pr-5">
          {ratings.map((rating, index) => (
            <button
              key={index}
              onClick={() => handleRatingClick(rating)}
              className={`px-4 py-2 rounded border border-sky-400 border-solid ${
                selectedRating === rating ? "bg-sky-400 text-white" : ""
              }`}
            >
              {rating}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RatingFilter;
